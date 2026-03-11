/**
 * @file Main application router.
 * @module src/routes/router.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import DogRouter from './DogRouter.js'
import TravelRouter from './TravelRouter.js'
import LocationRouter from './LocationRouter.js'
import AuthenticationRouter from './AuthenticationRouter.js'
import { NotFoundError } from '../utils/errors/NotFoundError.js'

export const router = express.Router()

router.use('/dogs', new DogRouter().getRouter())
router.use('/travel', new TravelRouter().getRouter())
router.use('/locations', new LocationRouter().getRouter())
router.use('/auth', new AuthenticationRouter().getRouter())
router.use('*', (req, res, next) => {
  next(new NotFoundError('The requested resource was not found.'))
})
