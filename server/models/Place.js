import mongoose from 'mongoose'

const PlaceSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    tags: { type: Array },
    googlePlaceId: { type: String },
    formattedAddress: { type: String },
    location: { type: Array },
  },
  {
    timestamps: true,
  }
)

delete mongoose.connection.models.Place

const Place = mongoose.model('Place', PlaceSchema)

module.exports = Place
