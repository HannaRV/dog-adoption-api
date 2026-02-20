/**
 * @file Mongoose model for dog adoption statistics by location.
 * @module src/models/Location.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: true },
  exported: { type: Number },
  imported: { type: Number },
  totalInState: { type: Number }
}, { timestamps: true })

export default mongoose.model('Location', locationSchema)