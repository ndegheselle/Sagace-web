```bash
# Development
docker compose up
```

```bash
# Production setup
mkdir opt
cd /opt
git clone https://github.com/ndegheselle/Sagace-web.git

# Production
git pull
docker compose -f compose.prod.yml build
docker compose -f compose.prod.yml up -d
```