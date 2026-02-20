/**
 * @file Not found error class.
 * @module src/utils/errors/NotFoundError.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export default class NotFoundError extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
  }
}