/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2195034256")

  // update collection data
  unmarshal({
    "name": "estimates_lines"
  }, collection)

  // remove field
  collection.fields.removeById("number3672808604")

  // remove field
  collection.fields.removeById("number2209673092")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_863811952",
    "hidden": false,
    "id": "relation3785202386",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "service",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(2, new Field({
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2195034256")

  // update collection data
  unmarshal({
    "name": "estimates_articles"
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number3672808604",
    "max": null,
    "min": null,
    "name": "unitPrice",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2209673092",
    "max": null,
    "min": null,
    "name": "vatRate",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("relation3785202386")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4287850865",
    "hidden": false,
    "id": "relation37359206",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "item",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
