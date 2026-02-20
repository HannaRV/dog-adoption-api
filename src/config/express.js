/**
 * @file Express application configuration.
 * @module src/config/express.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import cors from 'cors'
import SecurityHandler from '../middleware/SecurityHandler.js'
import ErrorHandler from '../middleware/ErrorHandler.js'

/**
 * Configures and manages the Express application.
 */
export default class ExpressApplication {
  #app
  #securityHandler
  #errorHandler

  /**
   * @param {SecurityHandler} [securityHandler] - Injected for testing.
   * @param {ErrorHandler} [errorHandler] - Injected for testing.
   */
  constructor (
    securityHandler = new SecurityHandler(),
    errorHandler = new ErrorHandler()
  ) {
    this.#app = express()
    this.#securityHandler = securityHandler
    this.#errorHandler = errorHandler
    this.#configureSecurityMiddleware()
    this.#configureBodyParsing()
    this.#configureRoutes()
    this.#configureErrorHandling()
  }

  #configureSecurityMiddleware () {
    this.#app.use(this.#securityHandler.getSecurityHeadersMiddleware())
    this.#app.use(this.#securityHandler.getRateLimitMiddleware())
    this.#app.use(cors())
  }

  #configureBodyParsing () {
    this.#app.use(express.json())
  }

  /**
   * Adds routes to the application.
   *
   * @param {string} path - Base path for the router.
   * @param {object} router - Express router.
   */
  #configureRoutes () {
    // Routes läggs till via addRouter()
  }

  #configureErrorHandling () {
    this.#app.use((err, req, res, next) =>
      this.#errorHandler.handle(err, req, res, next))
  }

  /**
   * Registers a router at the given path.
   *
   * @param {string} path - Base path.
   * @param {object} router - Express router.
   */
  addRouter (path, router) {
    this.#app.use(path, router)
  }

  /**
   * Returns the Express application instance.
   *
   * @returns {object} Express application.
   */
  getApp () {
    return this.#app
  }
}