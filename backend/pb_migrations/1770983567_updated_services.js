/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_863811952")

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
  const collection = app.findCollectionByNameOrId("pbc_863811952")

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
