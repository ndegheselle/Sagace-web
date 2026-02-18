# Getting started
```bash
go run . serve
```

# Development 
Test super user :
```
admin@test.local
test1234admin
```

Migrate collections :
```
pocketbase collections migrate
```

Generate typescript types :
```
npx pocketbase-typegen --url http://127.0.0.1:8090 --email admin@test.local --password 'test1234admin'
```