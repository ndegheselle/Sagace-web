/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    let users = app.findCollectionByNameOrId("users");
    let record = new Record(users);
    record.set("email", "test@example.com");
    record.set("password", "1234567890");

    app.save(record);
}, (app) => {
  // add down queries...
})
