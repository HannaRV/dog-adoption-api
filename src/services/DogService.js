/**
 * @file Service for dog business logic.
 * @module src/services/DogService.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import DogRepository from '../repositories/DogRepository.js'
import TravelRepository from '../repositories/TravelRepository.js'
import NotFoundError from '../utils/errors/NotFoundError.js'
import ValidationError from '../utils/errors/ValidationError.js'
import { PAGINATION_DEFAULTS } from '../config/apiConfig.js'

export default class DogService {
  #dogRepository
  #travelRepository

  constructor (dogRepository = new DogRepository(), travelRepository = new TravelRepository()) {
    this.#dogRepository = dogRepository
    this.#travelRepository = travelRepository
  }

  async getAllDogs ({ filter = {}, page = PAGINATION_DEFAULTS.PAGE, dogsPerPage = PAGINATION_DEFAULTS.PAGE_SIZE }) {
    return this.#dogRepository.findAll({ filter, page, dogsPerPage })
  }

  async getDogById (id) {
    const dog = await this.#dogRepository.findById(id)
    this.#throwIfDogNotFound(dog)
    return dog
  }

  async getDogTravelById (id) {
    const dog = await this.#dogRepository.findById(id)
    this.#throwIfDogNotFound(dog)
    return this.#travelRepository.findByPetfinderId(dog.petfinder_id)
  }

  async createDog (dogData) {
    try {
      return await this.#dogRepository.create(dogData)
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ValidationError(error.message)
      }
      throw error
    }
  }

  async updateDog (id, dogData) {
    const updatedDog = await this.#dogRepository.update(id, dogData)
    this.#throwIfDogNotFound(updatedDog)
    return updatedDog
  }

  async removeDog (id) {
    const removedDog = await this.#dogRepository.remove(id)
    this.#throwIfDogNotFound(removedDog)
    await this.#travelRepository.removeByPetfinderId(removedDog.petfinder_id)
    return removedDog
  }

  /**
   * Retrieves aggregated statistics for all dogs.
   *
   * @returns {Promise<object>} Aggregated dog statistics.
   */
  async getStatistics () {
    return this.#dogRepository.getStatistics()
  }

  #throwIfDogNotFound (dog) {
    if (!dog) {
      throw new NotFoundError('Dog not found')
    }
  }
}
