/**
 * @file Location routes.
 * @module src/routes/LocationRouter.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import LocationController from '../controllers/LocationController.js'

/**
 * Manages routes for location operations.
 */
export default class LocationRouter {
  #router
  #locationController

  /**
   * @param {LocationController} [locationController] - Injected for testing.
   */
  constructor (locationController = new LocationController()) {
    this.#router = express.Router()
    this.#locationController = locationController
    this.#configureRoutes()
  }

  #configureRoutes () {
    this.#router.get('/', (req, res, next) => this.#locationController.getAllLocations(req, res, next))
    this.#router.get('/:state', (req, res, next) => this.#locationController.getLocationByState(req, res, next))
  }

  /**
   * Returns the configured Express router.
   *
   * @returns {express.Router} Express router instance.
   */
  getRouter () {
    return this.#router
  }
}
