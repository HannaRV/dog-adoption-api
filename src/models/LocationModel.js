/**
 * @file Mongoose model for dog adoption statistics by location.
 * @module src/models/LocationModel.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const locationSchema = BASE_SCHEMA.clone()

locationSchema.add({
  location: { type: String, required: true, unique: true },
  exported: { type: Number },
  imported: { type: Number },
  totalInState: { type: Number }
})

export default mongoose.model('Location', locationSchema)
