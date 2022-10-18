import nextConnect from 'next-connect'
import middleware from '/middleware/database'

import dbConnect from '/utils/dbConnect'

dbConnect()

const User = require('/server/models/User')

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
  try {
    User.create({ ...req.body })
    console.log('its working')
    console.log('req', req.body)
  } catch (error) {
    res.send(error)
  }
})

export default (req, res) => handler.run(req, res)
