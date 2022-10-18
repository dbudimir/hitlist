import mongoose from 'mongoose'

const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema(
  {
    userFullName: { type: String },
    userName: { type: String, required: true, unique: true },
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  }
)

delete mongoose.connection.models.User

UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema)

module.exports = User
