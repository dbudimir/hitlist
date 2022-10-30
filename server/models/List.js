import mongoose from 'mongoose'

const ListSchema = new mongoose.Schema(
  {
    userCreated: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    name: { type: String },
    description: { type: String },
    places: [
      {
        ref: 'Place',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
)

delete mongoose.connection.models.List

const List = mongoose.model('List', ListSchema)

module.exports = List
