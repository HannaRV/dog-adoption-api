/**
 * @file Dog routes.
 * @module src/routes/DogRouter.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import DogController from '../controllers/DogController.js'
import authenticateJWT from '../middleware/authenticateJWT.js'

/**
 * Manages routes for dog operations.
 */
export default class DogRouter {
  #router
  #dogController

  /**
   * @param {DogController} [dogController] - Injected for testing.
   */
  constructor (dogController = new DogController()) {
    this.#router = express.Router()
    this.#dogController = dogController
    this.#configureRoutes()
  }

  #configureRoutes () {
    this.#router.get('/', (req, res, next) => this.#dogController.getAllDogs(req, res, next))
    this.#router.get('/:id', (req, res, next) => this.#dogController.getDogById(req, res, next))
    this.#router.get('/:id/travel', (req, res, next) => this.#dogController.getDogTravelById(req, res, next))
    this.#router.post('/', authenticateJWT, (req, res, next) => this.#dogController.createDog(req, res, next))
    this.#router.put('/:id', authenticateJWT, (req, res, next) => this.#dogController.updateDog(req, res, next))
    this.#router.delete('/:id', authenticateJWT, (req, res, next) => this.#dogController.removeDog(req, res, next))
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
