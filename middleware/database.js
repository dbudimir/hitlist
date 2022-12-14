// Page connecting Next.js to the database

import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const client = new MongoClient(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function database(req, res, next) {
  if (!client.connect()) await client.connect()
  req.dbClient = client
  req.db = client.db('hitlist')
  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware
