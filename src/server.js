/**
 * @file Application entry point.
 * @module src/server.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import 'dotenv/config'
import ExpressApplication from './config/express.js'
import connectMongoose from './config/mongoose.js'

const PORT = process.env.PORT || 3000

await connectMongoose()

const expressApplication = new ExpressApplication()
const server = expressApplication.getApp().listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))