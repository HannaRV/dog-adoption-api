/**
 * @file Loader for location documents.
 * @module src/utils/seed/loaders/locationLoader.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import LocationRepository from '../../../repositories/LocationRepository.js'

export default class LocationLoader {
  #locationRepository

  /**
   * @param {LocationRepository} [locationRepository] - Injected for testing.
   */
  constructor (locationRepository = new LocationRepository()) {
    this.#locationRepository = locationRepository
  }

  /**
   * Inserts a batch of location documents.
   *
   * @param {object[]} locations - Transformed location documents.
   */
  async load (locations) {
    await this.#locationRepository.insertMany(locations)
  }

  /**
   * Removes all location documents.
   */
  async clear () {
    await this.#locationRepository.deleteAll()
  }
}
