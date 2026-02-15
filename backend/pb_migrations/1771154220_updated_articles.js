/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // remove field
  collection.fields.removeById("select410122176")

  // add field
  collection.fields.addAt(5, new Field({
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select410122176",
    "maxSelect": 1,
    "name": "vatRateType",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "STANDARD",
      "INTERMEDIATE",
      "REDUCED",
      "SPECIAL",
      "EXEMPT"
    ]
  }))

  // remove field
  collection.fields.removeById("number2209673092")

  return app.save(collection)
})
