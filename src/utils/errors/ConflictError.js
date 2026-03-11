/**
 * @file Conflict error class.
 * @module src/utils/errors/ConflictError.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export default class ConflictError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ConflictError'
    this.status = 409
  }
}
