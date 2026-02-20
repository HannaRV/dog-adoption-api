/**
 * @file Security middleware handler.
 * @module src/middleware/SecurityHandler.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

/**
 * Handles application security middleware.
 * Provides abstraction over third-party security libraries.
 */
export default class SecurityHandler {
  #rateLimiter

  constructor () {
    this.#rateLimiter = this.#createRateLimiter()
  }

  /**
   * Returns Helmet middleware with basic security headers.
   *
   * @returns {Function} Express middleware for security headers.
   */
  getSecurityHeadersMiddleware () {
    return helmet()
  }

  /**
   * Returns rate limiting middleware.
   *
   * @returns {Function} Express middleware for rate limiting.
   */
  getRateLimitMiddleware () {
    return this.#rateLimiter
  }

  /**
   * Configures rate limiter: 100 requests per 15 minutes per IP.
   *
   * @returns {Function} Express rate limiting middleware.
   */
  #createRateLimiter () {
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        error: 'Too Many Requests',
        message: 'Please try again later'
      }
    })
  }
}