```bash
# Run local CI
act

# Pull NGINX image
docker pull nginx

# VRChat Run tests
./Test‑VRChat.sh

# Runner daemon starting
sudo acr_runner daemon

# status gitea
sudo systemctl status gitea
```