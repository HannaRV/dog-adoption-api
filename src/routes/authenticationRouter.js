/**
 * @file Authentication routes.
 * @module src/routes/AuthenticationRouter.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import AuthenticationController from '../controllers/AuthenticationController.js'

/**
 * Manages routes for authentication operations.
 */
export default class AuthenticationRouter {
  #router
  #authenticationController

  constructor (authenticationController = new AuthenticationController()) {
    this.#router = express.Router()
    this.#authenticationController = authenticationController
    this.#configureRoutes()
  }

  #configureRoutes () {
    this.#router.post('/register', (req, res, next) => this.#authenticationController.register(req, res, next))
    this.#router.post('/login', (req, res, next) => this.#authenticationController.login(req, res, next))
  }

  getRouter () {
    return this.#router
  }
}
