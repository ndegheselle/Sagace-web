## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Database

The container should be started before running these commands :

```bash
# Create schema
npx prisma generate

# Push schema to database
npx prisma db push

# Set default values
npx prisma db seed
```

Database setup is in `~/database/`.