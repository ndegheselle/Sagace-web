/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2703029140")

  // remove field
  collection.fields.removeById("text2929936659")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2703029140")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2929936659",
    "max": 20,
    "min": 0,
    "name": "reference",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
