/**
 * @file Repository for location data access.
 * @module src/repositories/LocationRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import Location from '../models/Location.js'

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
}