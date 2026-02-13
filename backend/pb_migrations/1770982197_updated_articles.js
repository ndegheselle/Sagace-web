/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // update field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1579384326",
    "max": 100,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3672808604",
    "max": null,
    "min": null,
    "name": "unitPrice",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // update field
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // update field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1579384326",
    "max": 100,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
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

  // update field
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

  return app.save(collection)
})
