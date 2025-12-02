Initialize the replica set:

Start a command on the docker container then use the `mongosh` command and use the following :

```js
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]
})
```