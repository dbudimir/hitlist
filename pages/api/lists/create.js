import nextConnect from 'next-connect'
import middleware from '/middleware/database'

import dbConnect from '/utils/dbConnect'

dbConnect()

const List = require('/server/models/List')
const Place = require('/server/models/Place')

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
  try {
    console.log(req.body)

    let listPlaces = []
    for (const place of req.body.places) {
      const newPlace = await Place.create(place)
      listPlaces.push(newPlace)
    }

    List.create({ ...req.body, places: listPlaces })

    console.log(listPlaces)

    // List.create()
    // User.create({ ...req.body })
  } catch (error) {
    res.send(error)
  }
})

export default (req, res) => handler.run(req, res)
