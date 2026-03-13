/**
 * @file Repository for dog data access.
 * @module src/repositories/DogRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import Dog from '../models/DogModel.js'
import { PAGINATION_DEFAULTS } from '../config/apiConfig.js'

export default class DogRepository {
  #model

  constructor (model = Dog) {
    this.#model = model
  }

  #calculateDogsToSkip (page, dogsPerPage) {
    return (page - 1) * dogsPerPage
  }

  async findAll ({ filter = {}, page = PAGINATION_DEFAULTS.PAGE, dogsPerPage = PAGINATION_DEFAULTS.PAGE_SIZE }) {
    const dogsToSkip = this.#calculateDogsToSkip(page, dogsPerPage)
    const dogs = await this.#model.find(filter).skip(dogsToSkip).limit(dogsPerPage).lean().exec()
    const totalDogs = await this.#model.countDocuments(filter)
    const totalPages = Math.ceil(totalDogs / dogsPerPage)

    return { dogs, totalDogs, totalPages, page, dogsPerPage }
  }

  async findById (id) {
    return this.#model.findById(id).lean().exec()
  }

  async create (dogData) {
    const dog = new this.#model(dogData)
    return dog.save()
  }

  async update (id, dogData) {
    return this.#model.findByIdAndUpdate(id, dogData, { returnDocument: 'after' }).lean().exec()
  }

  async remove (id) {
    return this.#model.findByIdAndDelete(id).lean().exec()
  }

  // Used by seed script only — not part of the API surface.
  async insertMany (dogs) {
    await this.#model.insertMany(dogs, { ordered: false })
  }

  // Used by seed script only — not part of the API surface.
  async deleteAll () {
    await this.#model.deleteMany({})
  }
}
