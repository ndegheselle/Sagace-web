```bash
# Development
docker compose up
```
Build the common package before building the rest.

# Production

## Setup
```bash
# Production setup
cd ~
git clone https://github.com/ndegheselle/Sagace-web.git

# Create .env.production for the API
cd /Sagace-web/packages/api
nano .env.production
```

## Start the server
```bash
cd ~/Sagace-web
git pull
docker compose -f compose.prod.yml build --no-cache
docker compose -f compose.prod.yml up -d
```

## More
Check logs
```bash
docker container ls
docker logs <container-id>
```

Reset everything
```bash
# Stop, remove, delete volumes for all containers
docker stop $(docker ps -a -q)
docker image prune
docker volume prune
```