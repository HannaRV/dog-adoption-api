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
    required: false
  },
  provider: {
    type: String,
    enum: ['local', 'github'],
    default: 'local'
  },
  providerId: {
    type: String
  }
})

userSchema.pre('save', async function () {
  if (!this.password || !this.isModified('password')) {
    return
  }
  this.password = await bcryptjs.hash(this.password, BCRYPT_SALT_ROUNDS)
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
