/**
 * @file Mongoose model for dog travel records.
 * @module src/models/Travel.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const travelSchema = new mongoose.Schema({
  petfinder_id: { type: String, required: true },
  contact_state: { type: String },
  found: { type: Date },
  still_there: { type: Boolean }
}, { timestamps: true })

export default mongoose.model('Travel', travelSchema)