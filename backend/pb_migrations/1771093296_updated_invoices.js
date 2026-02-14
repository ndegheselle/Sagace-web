/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2703029140")

  // update field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1008697051",
    "hidden": false,
    "id": "relation3218944360",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "articles",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_4042305242",
    "hidden": false,
    "id": "relation1932714345",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "services",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2703029140")

  // update field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1008697051",
    "hidden": false,
    "id": "relation3218944360",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "articles",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_4042305242",
    "hidden": false,
    "id": "relation1932714345",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "services",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
