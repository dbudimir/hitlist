const mongoose = require('mongoose')

const connection = {}

async function dbConnect() {
  if (connection.isConnected) {
    console.log('Using existing connection')
    return
  }
  const db = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('Connected')
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
