import nextConnect from 'next-connect'
import middleware from '/middleware/database'

import dbConnect from '/utils/dbConnect'

dbConnect()

const Place = require('/server/models/Place')

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    Place.find({}).then((allPlaces) => res.json(allPlaces))
  } catch (error) {
    res.status(500).send(error)
  }
})

export default (req, res) => handler.run(req, res)
