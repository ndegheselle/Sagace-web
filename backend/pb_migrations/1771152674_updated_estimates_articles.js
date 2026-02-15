/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2195034256")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3784529526",
    "hidden": false,
    "id": "relation3538568711",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "estimate",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4287850865",
    "hidden": false,
    "id": "relation37359206",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "article",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2195034256")

  // remove field
  collection.fields.removeById("relation3538568711")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4287850865",
    "hidden": false,
    "id": "relation37359206",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "article",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
