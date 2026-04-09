/**
 * @file Repository for user data access.
 * @module src/repositories/UserRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import User from '../models/UserModel.js'

export default class UserRepository {
  #model

  constructor (model = User) {
    this.#model = model
  }

  async findByEmail (email) {
    // .lean() is intentionally omitted — Mongoose instance is required for comparePassword()
    return this.#model.findOne({ email }).exec()
  }

  async create (userData) {
    const user = new this.#model(userData)
    return user.save()
  }

  /**
   * Finds a user by OAuth provider and provider ID.
   *
   * @param {string} provider - OAuth provider name.
   * @param {string} providerId - Provider's unique user ID.
   * @returns {Promise<object|null>} User document or null.
   */
  async findByProviderId (provider, providerId) {
    return this.#model.findOne({ provider, providerId }).exec()
  }

  /**
   * Updates a user's OAuth provider information.
   *
   * @param {string} id - User's internal MongoDB ID.
   * @param {string} provider - OAuth provider name.
   * @param {string} providerId - Provider's unique user ID.
   * @returns {Promise<object>} Updated user document.
   */
  async updateProviderInfo (id, provider, providerId) {
    return this.#model.findByIdAndUpdate(
      id,
      { provider, providerId },
      { returnDocument: 'after' }
    ).exec()
  }
}
