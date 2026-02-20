/**
 * @file Mongoose model for adoptable dogs.
 * @module src/models/Dog.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const dogSchema = new mongoose.Schema({
  petfinder_id: { type: String, required: true, unique: true },
  name: { type: String },
  breed_primary: { type: String },
  breed_mixed: { type: Boolean },
  color_primary: { type: String },
  age: { type: String },
  sex: { type: String },
  size: { type: String },
  coat: { type: String },
  fixed: { type: Boolean },
  house_trained: { type: Boolean },
  special_needs: { type: Boolean },
  shots_current: { type: Boolean },
  env_children: { type: Boolean },
  env_dogs: { type: Boolean },
  env_cats: { type: Boolean },
  contact_state: { type: String },
  description: { type: String }
}, { timestamps: true })

export default mongoose.model('Dog', dogSchema)