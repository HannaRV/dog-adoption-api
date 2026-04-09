/**
 * @file Authentication routes.
 * @module src/routes/AuthenticationRouter.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import AuthenticationController from '../controllers/AuthenticationController.js'
import SecurityHandler from '../middleware/SecurityHandler.js'

/**
 * Manages routes for authentication operations.
 */
export default class AuthenticationRouter {
  #router
  #authenticationController
  #securityHandler

  /**
   * @param {AuthenticationController} [authenticationController] - Injected for testing.
   * @param {SecurityHandler} [securityHandler] - Injected for testing.
   */
  constructor (
    authenticationController = new AuthenticationController(),
    securityHandler = new SecurityHandler()
  ) {
    this.#router = express.Router()
    this.#authenticationController = authenticationController
    this.#securityHandler = securityHandler
    this.#configureRoutes()
  }

  #configureRoutes () {
    this.#router.post('/register', (req, res, next) => this.#authenticationController.register(req, res, next))
    this.#router.post('/login', (req, res, next) => this.#authenticationController.login(req, res, next))
    this.#router.post('/oauth',
      this.#securityHandler.getOAuthRateLimitMiddleware(),
      (req, res, next) => this.#authenticationController.oauthFindOrCreate(req, res, next)
    )
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
