/**
 * @file Travel routes.
 * @module src/routes/TravelRouter.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import TravelController from '../controllers/TravelController.js'

/**
 * Manages routes for travel operations.
 */
export default class TravelRouter {
  #router
  #travelController

  /**
   * @param {TravelController} [travelController] - Injected for testing.
   */
  constructor (travelController = new TravelController()) {
    this.#router = express.Router()
    this.#travelController = travelController
    this.#configureRoutes()
  }

  #configureRoutes () {
    this.#router.get('/', (req, res, next) => this.#travelController.getAllTravelRecords(req, res, next))
    this.#router.get('/:petfinderId', (req, res, next) => this.#travelController.getTravelRecordByPetfinderId(req, res, next))
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
