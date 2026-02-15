/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3784529526")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2195034256",
    "hidden": false,
    "id": "relation1325501590",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "lines",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3784529526")

  // remove field
  collection.fields.removeById("relation1325501590")

  return app.save(collection)
})
