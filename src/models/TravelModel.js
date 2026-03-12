/**
 * @file Mongoose model for dog travel records.
 * @module src/models/TravelModel.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const travelSchema = BASE_SCHEMA.clone()

travelSchema.add({
  petfinder_id: { type: String, required: true },
  contact_state: { type: String },
  found: { type: Date },
  still_there: { type: Boolean }
})

export default mongoose.model('Travel', travelSchema)
