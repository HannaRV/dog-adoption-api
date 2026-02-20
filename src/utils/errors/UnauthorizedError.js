/**
 * @file Unauthorized error class.
 * @module src/utils/errors/UnauthorizedError.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export default class UnauthorizedError extends Error {
  constructor (message) {
    super(message)
    this.name = 'UnauthorizedError'
    this.status = 401
  }
}