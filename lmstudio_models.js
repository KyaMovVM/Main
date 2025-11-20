// This script fetches LMStudio models from the local LMStudio server.
// It can be used as a utility or integrated into the API.

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const util = require('util');
const execFileAsync = util.promisify(execFile);

const LMSTUDIO_URL = 'http://127.0.0.1:1234';

function fetchModels(callback) {
  const url = `${LMSTUDIO_URL}/models`;
  const client = url.startsWith('https') ? https : http;

  client.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        callback(null, json);
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', (err) => callback(err));
}

// --- GPT OS 20 style code checker ---
async function findJsFiles(dir) {
  const results = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      results.push(...await findJsFiles(full));
    } else if (e.isFile() && full.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

async function checkSyntaxWithNode(filePath) {
  try {
    await execFileAsync(process.execPath, ['--check', filePath], { timeout: 10_000 });
    return { file: filePath, ok: true };
  } catch (err) {
    return { file: filePath, ok: false, error: (err.stderr || err.stdout || err.message).toString() };
  }
}

function extractTodos(content) {
  const re = /\/\/\s*(?:TODO|FIXME|NOTE)[:\s-]?(.*)/gi;
  const matches = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    matches.push(m[1].trim());
  }
  return matches;
}

async function checkCode(options = {}) {
  const root = options.root || process.cwd();
  const files = await findJsFiles(root);
  const fileResults = [];
  for (const f of files) {
    const content = await fs.promises.readFile(f, 'utf8');
    const todos = extractTodos(content);
    const syntax = await checkSyntaxWithNode(f);
    fileResults.push({ file: f, todos, syntax });
  }
  const summary = {
    scanned: files.length,
    errors: fileResults.filter(r => !r.syntax.ok).length,
    timestamp: new Date().toISOString(),
  };
  return { summary, files: fileResults };
}

async function ensureDir(dir) {
  try { await fs.promises.mkdir(dir, { recursive: true }); } catch (_) {}
}

async function writeLog(logPath, data) {
  const dir = path.dirname(logPath);
  await ensureDir(dir);
  const str = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(logPath, str, 'utf8');
}

// --- LLM integration ---
async function callLLM({ prompt, model = 'gpt-3.5-turbo', apiKey, endpoint } = {}) {
  apiKey = apiKey || process.env.OPENAI_API_KEY;
  endpoint = endpoint || process.env.LLM_ENDPOINT || 'https://api.openai.com/v1/chat/completions';

  if (!apiKey) {
    throw new Error('No API key provided. Set OPENAI_API_KEY environment variable or pass apiKey option.');
  }

  const body = JSON.stringify({
    model,
    messages: [
      { role: 'system', content: 'You are a helpful assistant that returns code fixes. When proposing file updates return the new file content inside a fenced code block (triple backticks).' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 1500
  });

  return await new Promise((resolve, reject) => {
    const u = new URL(endpoint);
    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + (u.search || ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization': `Bearer ${apiKey}`
      }
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // OpenAI chat completions: take first choice
          if (json.choices && json.choices[0] && json.choices[0].message) {
            resolve(json.choices[0].message.content);
          } else if (json.output) {
            // some other LLMs
            resolve(typeof json.output === 'string' ? json.output : JSON.stringify(json.output));
          } else {
            resolve(JSON.stringify(json));
          }
        } catch (e) {
          reject(new Error('Failed to parse LLM response: ' + e.message + '\nRaw:' + data));
        }
      });
    });
    req.on('error', (err) => reject(err));
    req.write(body);
    req.end();
  });
}

function parseFirstCodeBlock(text) {
  if (!text) return null;
  const m = text.match(/```(?:[\w+-]*)\n([\s\S]*?)```/);
  return m ? m[1].replace(/\r\n/g, '\n') : null;
}

async function applySuggestedContent(filePath, newContent) {
  const backup = filePath + '.bak.' + Date.now();
  await fs.promises.copyFile(filePath, backup);
  await fs.promises.writeFile(filePath, newContent, 'utf8');
  return backup;
}

// Exported for programmatic use
module.exports = { fetchModels, checkCode };

// CLI: support `--check-code` and `--log <path>`
async function runCli() {
  const argv = process.argv.slice(2);
  const doCheck = argv.includes('--check-code') || argv.includes('--gpt-os20');
  const logIndex = argv.indexOf('--log');
  const logPath = (logIndex !== -1 && argv[logIndex + 1]) ? argv[logIndex + 1] : path.join(process.cwd(), 'logs', 'gpt_os20_check.log');

  if (doCheck) {
    console.log('GPT OS 20: starting code check...');
    try {
      const result = await checkCode({ root: process.cwd() });
      await writeLog(logPath, result);
      console.log(`Code check finished. Scanned ${result.summary.scanned} files, errors: ${result.summary.errors}`);
      console.log(`Log written to: ${logPath}`);
      if (result.summary.errors > 0) process.exitCode = 2;
    } catch (e) {
      console.error('Error during code check:', e);
      process.exitCode = 1;
    }
    return;
  }

  // LLM-driven check: --llm-check <file> [--apply]
  const llmIndex = argv.indexOf('--llm-check');
  if (llmIndex !== -1) {
    const target = argv[llmIndex + 1];
    const applyFlag = argv.includes('--apply');
    const modelIndex = argv.indexOf('--llm-model');
    const model = (modelIndex !== -1 && argv[modelIndex + 1]) ? argv[modelIndex + 1] : process.env.LLM_MODEL || 'gpt-3.5-turbo';
    if (!target) {
      console.error('Usage: --llm-check <file> [--apply]');
      process.exit(1);
    }
    try {
      const filePath = path.resolve(process.cwd(), target);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const prompt = `Please analyze the following JavaScript file for bugs, mistakes and improvements. If you propose a fix, return only the full updated file content inside a single fenced code block (triple backticks). If no change needed, explain briefly.\n\nFILE START:\n${content}\n\nFILE END:`;
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        console.error('No OPENAI_API_KEY set. Set environment variable OPENAI_API_KEY to call the LLM.');
        console.log('LLM prompt preview:\n', prompt.slice(0, 800), '...');
        process.exit(1);
      }
      console.log(`Calling LLM model=${model} for ${target}...`);
      const reply = await callLLM({ prompt, model, apiKey });
      console.log('\n=== LLM reply ===\n');
      console.log(reply);
      const suggested = parseFirstCodeBlock(reply);
      if (suggested) {
        console.log('\nDetected code block in LLM reply.');
        if (applyFlag) {
          const backup = await applySuggestedContent(filePath, suggested);
          console.log(`Applied suggested content to ${filePath}. Backup at ${backup}`);
        } else {
          console.log('To apply the suggested change run with --apply (this will replace file and create a .bak).');
        }
      } else {
        console.log('\nNo code block detected — nothing applied.');
      }
    } catch (e) {
      console.error('LLM check failed:', e);
      process.exitCode = 1;
    }
    return;
  }

  // Default behaviour: original fetch models example
  fetchModels((err, models) => {
    if (err) {
      console.error('Error fetching LMStudio models:', err);
      process.exit(1);
    }
    console.log('LMStudio models:', JSON.stringify(models, null, 2));
  });
}

if (require.main === module) runCli();
