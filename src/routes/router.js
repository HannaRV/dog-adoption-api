/**
 * @file Main router.
 * @module src/routes/router.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import dogRouter from './DogRouter.js'
import travelRouter from './TravelRouter.js'
import locationRouter from './LocationRouter.js'
import authenticationRouter from './AuthenticationRouter.js'

export const router = express.Router()

router.use('/dogs', dogRouter)
router.use('/travel', travelRouter)
router.use('/locations', locationRouter)
router.use('/auth', authenticationRouter)
