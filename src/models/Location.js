import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  location: { type: String, unique: true },
  exported: { type: Number },
  imported: { type: Number },
  totalInState: { type: Number },
}, { timestamps: true })

export default mongoose.model('Location', locationSchema)