/**
 * @file Repository for location data access.
 * @module src/repositories/LocationRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import Location from '../models/LocationModel.js'

export default class LocationRepository {
  #model

  constructor (model = Location) {
    this.#model = model
  }

  async findAll () {
    return this.#model.find().lean().exec()
  }

  async findByState (state) {
    return this.#model.findOne({ location: state }).lean().exec()
  }

  // Used by seed script only — not part of the API surface.
  async insertMany (locations) {
    await this.#model.insertMany(locations, { ordered: false })
  }

  // Used by seed script only — not part of the API surface.
  async deleteAll () {
    await this.#model.deleteMany({})
  }
}
