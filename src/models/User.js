/**
 * @file Mongoose model for users.
 * @module src/models/User.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  const passwordWasNotModified = !this.isModified('password')

  if (passwordWasNotModified) {
    return next()
  }

  this.password = await bcryptjs.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)