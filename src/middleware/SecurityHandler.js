/**
 * @file Security middleware using established libraries.
 * @module src/middleware/SecurityHandler.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 100
const OAUTH_RATE_LIMIT_MAX_REQUESTS = 10

export default class SecurityHandler {
  #rateLimiter

  constructor () {
    this.#rateLimiter = this.#createRateLimiter(RATE_LIMIT_MAX_REQUESTS)
  }

  getSecurityHeadersMiddleware () {
    return helmet()
  }

  getRateLimitMiddleware () {
    return this.#rateLimiter
  }

  /**
   * Returns strict rate limiting middleware for OAuth endpoints.
   *
   * @returns {Function} Express middleware for OAuth rate limiting.
   */
  getOAuthRateLimitMiddleware () {
    return this.#createRateLimiter(OAUTH_RATE_LIMIT_MAX_REQUESTS)
  }

  /**
   * Creates a rate limiter with the given max requests per window.
   *
   * @param {number} max - Maximum requests per window.
   * @returns {Function} Express rate limiting middleware.
   */
  #createRateLimiter (max) {
    return rateLimit({
      windowMs: RATE_LIMIT_WINDOW_MS,
      max,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        error: 'Too Many Requests',
        message: 'Please try again later'
      }
    })
  }
}
