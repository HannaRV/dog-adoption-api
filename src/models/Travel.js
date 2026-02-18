import mongoose from 'mongoose'

const travelSchema = new mongoose.Schema({
  petfinder_id: { type: String },
  contact_state: { type: String },
  found: { type: Date },
  still_there: { type: Boolean }
}, { timestamps: true })

export default mongoose.model('Travel', travelSchema)