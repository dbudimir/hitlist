import nextConnect from 'next-connect'
import middleware from '/middleware/database'

import dbConnect from '/utils/dbConnect'

dbConnect()

const List = require('/server/models/List')

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    List.find({}).then((allLists) => res.json(allLists))
  } catch (error) {
    res.status(500).send(error)
  }
})

export default (req, res) => handler.run(req, res)
