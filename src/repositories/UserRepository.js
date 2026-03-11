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
}
