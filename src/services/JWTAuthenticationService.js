/**
 * @file Service for JWT authentication logic.
 * @module src/services/JWTAuthenticationService.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'

import UserRepository from '../repositories/UserRepository.js'
import UnauthorizedError from '../utils/errors/UnauthorizedError.js'
import ConflictError from '../utils/errors/ConflictError.js'
import ValidationError from '../utils/errors/ValidationError.js'
import { JWT_CONFIG } from '../config/authConfig.js'

export default class JWTAuthenticationService {
  #userRepository

  constructor (userRepository = new UserRepository()) {
    this.#userRepository = userRepository
  }

  #generateToken (userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: JWT_CONFIG.ALGORITHM }
    )
  }

  async register (username, email, password) {
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      throw new ValidationError('Invalid input')
    }

    const existingUser = await this.#userRepository.findByEmail(email)
    const emailAlreadyExists = Boolean(existingUser)

    if (emailAlreadyExists) {
      throw new ConflictError('Email already in use')
    }

    const user = await this.#userRepository.create({ username, email, password })
    const token = this.#generateToken(user._id)
    return { token }
  }

  async login (email, password) {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new ValidationError('Invalid input')
    }

    const user = await this.#userRepository.findByEmail(email)
    const userWasNotFound = !user

    if (userWasNotFound) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const passwordIsCorrect = await user.comparePassword(password)

    if (!passwordIsCorrect) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = this.#generateToken(user._id)
    return { token }
  }

  /**
   * Finds or creates a user via OAuth provider and returns a JWT.
   *
   * @param {string} provider - OAuth provider name (e.g. 'github').
   * @param {string} providerId - Provider's unique user ID.
   * @param {string} email - User's email from provider.
   * @param {string} username - User's username from provider.
   * @returns {Promise<{token: string}>} JWT token.
   */
  async oauthFindOrCreate (provider, providerId, email, username) {
    let user = await this.#userRepository.findByProviderId(provider, providerId)

    if (!user) {
      const existingEmail = await this.#userRepository.findByEmail(email)
      if (existingEmail) {
        user = await this.#userRepository.updateProviderInfo(existingEmail._id, provider, providerId)
      } else {
        user = await this.#userRepository.create({ username, email, provider, providerId })
      }
    }

    const token = this.#generateToken(user._id)
    return { token }
  }
}
