const Dialogue = require('../../novel.js');

// Mock DOM implementation without jsdom
class MockElement {
  constructor(tag) {
    this.tag = tag;
    this.textContent = '';
    this.innerHTML = '';
    this.onclick = null;
    this.children = [];
    this.parent = null;
  }

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  remove() {
    if (this.parent) {
      const idx = this.parent.children.indexOf(this);
      if (idx > -1) {
        this.parent.children.splice(idx, 1);
      }
    }
  }

  click() {
    if (this.onclick) {
      this.onclick();
    }
  }

  querySelector(selector) {
    if (selector === 'h3') return this.children.find(c => c.tag === 'h3') || null;
    if (selector === 'p') return this.children.find(c => c.tag === 'p') || null;
    if (selector === 'button') return this.children.find(c => c.tag === 'button') || null;
    return null;
  }

  querySelectorAll(selector) {
    if (selector === 'h3') return this.children.filter(c => c.tag === 'h3');
    if (selector === 'p') return this.children.filter(c => c.tag === 'p');
    if (selector === 'button') return this.children.filter(c => c.tag === 'button');
    return [];
  }
}

describe('VisualNovel', () => {
  let game;

  beforeEach(() => {
    game = new Dialogue();
  });

  test('creates a new game instance', () => {
    expect(game).toBeDefined();
    expect(game.currentScene).toBe(0);
    expect(game.scenes.length).toBe(0);
    expect(game.history.length).toBe(0);
  });

  test('adds scenes correctly', () => {
    const scene = { id: 'scene_1', dialogue: 'Hello' };
    game.addScene(scene);
    expect(game.scenes.length).toBe(1);
    expect(game.scenes[0]).toBe(scene);
  });

  test('gets current scene', () => {
    const scene1 = { id: 'scene_1', dialogue: 'First' };
    const scene2 = { id: 'scene_2', dialogue: 'Second' };
    game.addScene(scene1);
    game.addScene(scene2);
    
    expect(game.getCurrentScene()).toBe(scene1);
    game.currentScene = 1;
    expect(game.getCurrentScene()).toBe(scene2);
  });

  test('moves to next scene', () => {
    game.addScene({ id: 'scene_1' });
    game.addScene({ id: 'scene_2' });
    
    expect(game.currentScene).toBe(0);
    game.nextScene();
    expect(game.currentScene).toBe(1);
    expect(game.history.length).toBe(1);
  });

  test('returns to previous scene', () => {
    game.addScene({ id: 'scene_1' });
    game.addScene({ id: 'scene_2' });
    game.addScene({ id: 'scene_3' });
    
    game.nextScene();
    game.nextScene();
    expect(game.currentScene).toBe(2);
    
    game.previousScene();
    expect(game.currentScene).toBe(1);
  });

  test('handles scenes with choices', () => {
    game.addScene({
      id: 'scene_1',
      choices: [
        { text: 'Option 1', nextScene: 'scene_2' },
        { text: 'Option 2', nextScene: 'scene_3' }
      ]
    });
    game.addScene({ id: 'scene_2' });
    game.addScene({ id: 'scene_3' });
    
    game.nextScene(0); // Choose first option
    expect(game.currentScene).toBe(1);
    
    game.previousScene();
    game.nextScene(1); // Choose second option
    expect(game.currentScene).toBe(2);
  });

  test('renders to DOM', () => {
    const container = {
      id: 'game-container',
      textContent: '',
      innerHTML: ''
    };
    
    global.document = {
      getElementById: () => container
    };

    game.addScene({
      id: 'scene_1',
      background: '🏫 Classroom',
      character: '👧 Girl',
      characterName: 'Yuki',
      dialogue: 'Hello!'
    });

    game.render();
    // Basic check that render doesn't throw
    expect(game.render).toBeDefined();
  });
});
