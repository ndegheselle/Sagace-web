/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3784529526")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_2195034256",
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
  collection.fields.addAt(5, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1312440465",
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
  const collection = app.findCollectionByNameOrId("pbc_3784529526")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_2195034256",
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
  collection.fields.addAt(5, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_1312440465",
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
