
Test super user :
```
admin@test.local
test1234admin
```

Generate typescript types :
```
npx pocketbase-typegen --url http://127.0.0.1:8090 --email admin@test.local --password 'test1234admin'
```

Create migrations once all the collections are created :
https://pocketbase.io/docs/go-migrations/