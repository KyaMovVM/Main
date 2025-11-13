# AI Coding Agent Instructions for the **Main** Project

## 1. Project Overview

- **Purpose** – A lightweight API service that demonstrates Gitea CI/CD, Act Runner, and Docker integration.
- **Key components** –
  - `README.md` – high‑level architecture and build notes.
  - `ssh scripts/` – helper PowerShell / Bash scripts for SSH key management.
  - `Test‑VRChat.sh` – example test harness.
- **External dependencies** – NGINX Docker image, Tanstack/SWR for client‑side state.

## 2. Build \u0026 Test Workflow

| Step             | Command             | Notes                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------- |
| **CI**           | `act` (Act Runner)  | Runs GitHub Actions locally; see `.gitea/workflows/` for job definitions. |
| **Docker**       | `docker pull nginx` | Pull the base image used in deployment scripts.                           |
| **Test harness** | `./Test‑VRChat.sh`  | Executes integration tests; requires `bash` on Windows (WSL or Git Bash). |

\u003e **Tip** – The repository uses **Gitea** as the Git server; all CI jobs are defined under `.gitea/workflows/`. If you add a new workflow, place it there and run `act` to validate locally.

## 3. Coding Conventions

- **API endpoints** – All endpoints are prefixed with `/api`. Example: `GET /api/getUserProfile`.
- **State management** – Client uses Tanstack Query/SWR. Cache keys follow the pattern `['user']`.
- **Mutation pattern** – After a POST/PUT, call `invalidateCache('user')` to trigger refetch.
- **Error handling** – Use optimistic updates and retry logic; see README for example flow.

## 4. Common Tasks for Agents

1. **Add a new API endpoint** –
   ```bash
   # Create handler file
   touch api/handlers/user.js
   # Register route in server.js
   app.post('/api/updateUser', userHandler.update)
   ```
2. **Create a new SSH helper script** –
   ```powershell
   # ssh scripts/ssh_test_and_create_secrets.ps1
   New-Item -ItemType File -Path "ssh scripts/new_secret.ps1"
   ```
3. **Run local CI** – `act` will execute all jobs defined in `.gitea/workflows/`.

## 5. External Integration Points

- **NGINX Docker** – The deployment script pulls `nginx` and mounts the built artifacts.
- **Tanstack/SWR** – Client side state is managed via SWR; look at `README.md` for cache invalidation examples.

## 6. Troubleshooting

- **Act Runner errors** – Ensure `act` is installed (`winget install act`) and that Docker Desktop is running.
- **Docker pull failures** – Verify network connectivity; use `docker login` if a private registry is required.
- **SSH script failures** – Run scripts in PowerShell with `Set-ExecutionPolicy RemoteSigned` if blocked.

---

**Feedback** – If any section is unclear or missing, let me know and I’ll refine the instructions.
