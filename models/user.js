const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.statics.generateHash = async function(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

UserSchema.statics.comparePassword = async function(password, hash) {
  return bcrypt.compare(password, hash)
}

module.exports = mongoose.model('User', UserSchema)
