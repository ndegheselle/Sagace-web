```bash
# Development
docker compose up
```

# Production

## Setup
```bash
# Production setup
mkdir opt
cd /opt
git clone https://github.com/ndegheselle/Sagace-web.git

# Create .env.production for the API
cd /opt/Sagace-web/packages/api
nano .env.production
```

## Start the server
```bash
# Production
git pull
docker compose -f compose.prod.yml build --no-cache
docker compose -f compose.prod.yml up -d
```

## More
```bash
# Stop, remove, delete volumes for all containers
docker stop $(docker ps -a -q)
docker image prune
docker volume prune
```