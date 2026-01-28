/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // add field
  collection.fields.addAt(4, new Field({
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
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select410122176",
    "maxSelect": 1,
    "name": "vatRateType",
    "presentable": false,
    "required": false,
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

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number2683508278",
    "max": null,
    "min": null,
    "name": "quantity",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // remove field
  collection.fields.removeById("number3672808604")

  // remove field
  collection.fields.removeById("select410122176")

  // remove field
  collection.fields.removeById("number2683508278")

  return app.save(collection)
})
