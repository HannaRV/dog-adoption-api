/**
 * @file Validation error class.
 * @module src/utils/errors/ValidationError.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export default class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
    this.status = 400
  }
}