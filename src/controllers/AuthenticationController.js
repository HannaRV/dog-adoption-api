/**
 * @file Controller for handling authentication requests.
 * @module src/controllers/AuthenticationController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'
import JWTAuthenticationService from '../services/JWTAuthenticationService.js'

/**
 * Coordinates authentication operations between HTTP layer and authentication service.
 */
export default class AuthenticationController {
  #authenticationService

  constructor (authenticationService = new JWTAuthenticationService()) {
    this.#authenticationService = authenticationService
  }

  /**
   * Registers a new user and returns a JWT token.
   *
   * @param {object} req - Express request object.
   * @param {object} req.body - { username, email, password }
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const { username, email, password } = req.body
      const token = await this.#authenticationService.register(username, email, password)
      res.status(HTTP_STATUS.CREATED).json(token)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authenticates a user and returns a JWT token.
   *
   * @param {object} req - Express request object.
   * @param {object} req.body - { email, password }
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const { email, password } = req.body
      const token = await this.#authenticationService.login(email, password)
      res.status(HTTP_STATUS.OK).json(token)
    } catch (error) {
      next(error)
    }
  }
}
