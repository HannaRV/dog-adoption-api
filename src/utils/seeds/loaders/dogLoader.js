/**
 * @file Loader for dog documents.
 * @module src/utils/seed/loaders/dogLoader.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import DogRepository from '../../../repositories/DogRepository.js'

export default class DogLoader {
  #dogRepository

  /**
   * @param {DogRepository} [dogRepository] - Injected for testing.
   */
  constructor (dogRepository = new DogRepository()) {
    this.#dogRepository = dogRepository
  }

  /**
   * Inserts a batch of dog documents.
   *
   * @param {object[]} dogs - Transformed dog documents.
   */
  async load (dogs) {
    await this.#dogRepository.insertMany(dogs)
  }

  /**
   * Removes all dog documents.
   */
  async clear () {
    await this.#dogRepository.deleteAll()
  }
}
