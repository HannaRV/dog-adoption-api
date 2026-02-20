/**
 * @file Repository for user data access.
 * @module src/repositories/UserRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import User from '../models/User.js'

export default class UserRepository {
  #model

  constructor (model = User) {
    this.#model = model
  }

  async findByEmail (email) {
    return this.#model.findOne({ email }).lean().exec()
  }

  async create (userData) {
    const user = new this.#model(userData)
    return user.save()
  }
}