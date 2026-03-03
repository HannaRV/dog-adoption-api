/**
 * @file Loader for travel documents.
 * @module src/utils/seed/loaders/travelLoader.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import TravelRepository from '../../../repositories/TravelRepository.js'

/**
 * Loads transformed travel data into the database.
 */
export default class TravelLoader {
  #travelRepository

  /**
   * @param {TravelRepository} [travelRepository] - Injected for testing.
   */
  constructor (travelRepository = new TravelRepository()) {
    this.#travelRepository = travelRepository
  }

  /**
   * Inserts a batch of travel documents.
   *
   * @param {object[]} travelRecords - Transformed travel documents.
   */
  async load (travelRecords) {
    await this.#travelRepository.insertMany(travelRecords)
  }

  /**
   * Removes all travel documents.
   */
  async clear () {
    await this.#travelRepository.deleteAll()
  }
}
