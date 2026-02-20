/**
 * @file Express application configuration.
 * @module src/app.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import cors from 'cors'
import SecurityHandler from './middleware/SecurityHandler.js'
import ErrorHandler from './middleware/ErrorHandler.js'

const app = express()
const securityHandler = new SecurityHandler()
const errorHandler = new ErrorHandler()

app.use(securityHandler.getSecurityHeadersMiddleware())
app.use(securityHandler.getRateLimitMiddleware())
app.use(cors())
app.use(express.json())

// Routes kommer här

app.use((err, req, res, next) => errorHandler.handle(err, req, res, next))

export default app