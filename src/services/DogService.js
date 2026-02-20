/**
 * @file Service for dog business logic.
 * @module src/services/DogService.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import DogRepository from '../repositories/DogRepository.js'
import TravelRepository from '../repositories/TravelRepository.js'
import NotFoundError from '../utils/errors/NotFoundError.js'

export default class DogService {
  #dogRepository
  #travelRepository

  constructor (dogRepository = new DogRepository(), travelRepository = new TravelRepository()) {
    this.#dogRepository = dogRepository
    this.#travelRepository = travelRepository
  }

  #throwIfDogNotFound (dog) {
    if (!dog) {
      throw new NotFoundError('Dog not found')
    }
  }

  async getAllDogs ({ filter = {}, page = 1, dogsPerPage = 20 }) {
    return this.#dogRepository.findAll({ filter, page, dogsPerPage })
  }

  async getDogById (id) {
    const dog = await this.#dogRepository.findById(id)
    this.#throwIfDogNotFound(dog)
    return dog
  }

  async createDog (dogData) {
    return this.#dogRepository.create(dogData)
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
}