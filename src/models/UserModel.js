/**
 * @file Mongoose model for users.
 * @module src/models/UserModel.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

import { BASE_SCHEMA } from './baseSchema.js'

const BCRYPT_SALT_ROUNDS = 10

const userSchema = BASE_SCHEMA.clone()

userSchema.add({
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
})

userSchema.pre('save', async function () {
  const passwordWasNotModified = !this.isModified('password')

  if (passwordWasNotModified) {
    return
  }

  this.password = await bcryptjs.hash(this.password, BCRYPT_SALT_ROUNDS)
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
