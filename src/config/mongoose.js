/**
 * @file MongoDB database connection configuration.
 * @module src/config/mongoose.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Connects to MongoDB using the connection string from environment variables.
 */
const connectMongoose = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI)
  console.log(`MongoDB connected: ${connection.connection.host}`)
}

export default connectMongoose