import nextConnect from 'next-connect'
import middleware from '/middleware/database'

import dbConnect from '/utils/dbConnect'

dbConnect()

const User = require('/server/models/User')

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {
  try {
    User.find({}).then((allUsers) => res.json(allUsers))
  } catch (error) {
    res.status(500).send(error)
  }
})

export default (req, res) => handler.run(req, res)
