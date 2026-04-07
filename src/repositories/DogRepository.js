/**
 * @file Repository for dog data access.
 * @module src/repositories/DogRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import Dog from '../models/DogModel.js'
import { PAGINATION_DEFAULTS, DOG_BOOLEAN_FIELDS, US_STATE_CODE_PATTERN } from '../config/apiConfig.js'

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

  /**
   * Retrieves aggregated statistics for all dogs.
   *
   * @returns {Promise<object>} Aggregated dog statistics including summary,
   * distributions by age/sex/size/state, and boolean field counts.
   */
  async getStatistics () {
    const booleanGroup = DOG_BOOLEAN_FIELDS.reduce((acc, field) => {
      acc[`${field}_true`] = { $sum: { $cond: [`$${field}`, 1, 0] } }
      acc[`${field}_false`] = { $sum: { $cond: [`$${field}`, 0, 1] } }
      return acc
    }, { _id: null })

    const [result] = await this.#model.aggregate([
      {
        $facet: {
          summary: [{ $count: 'total' }],
          byAge: [{ $match: { age: { $ne: null } } }, { $group: { _id: '$age', count: { $sum: 1 } } }, { $sort: { _id: 1 } }],
          bySex: [{ $match: { sex: { $ne: null } } }, { $group: { _id: '$sex', count: { $sum: 1 } } }, { $sort: { _id: 1 } }],
          bySize: [{ $match: { size: { $ne: null } } }, { $group: { _id: '$size', count: { $sum: 1 } } }, { $sort: { _id: 1 } }],
          byState: [{ $match: { contact_state: { $regex: US_STATE_CODE_PATTERN } } }, { $group: { _id: '$contact_state', count: { $sum: 1 } } }, { $sort: { _id: 1 } }],
          booleans: [{ $group: booleanGroup }]
        }
      }
    ]).exec()

    return {
      summary: { total: result.summary[0]?.total || 0 },
      byAge: { x: result.byAge.map(d => d._id), y: result.byAge.map(d => d.count) },
      bySex: { x: result.bySex.map(d => d._id), y: result.bySex.map(d => d.count) },
      bySize: { x: result.bySize.map(d => d._id), y: result.bySize.map(d => d.count) },
      byState: Object.fromEntries(result.byState.map(d => [d._id, d.count])),
      booleans: Object.fromEntries(
        DOG_BOOLEAN_FIELDS.map(field => [
          field,
          this.#buildBooleanStats(result.booleans, field)
        ])
      )
    }
  }

  /**
   * Extracts true/false counts for a boolean field from aggregation results.
   *
   * @param {Array} data - Aggregation result array.
   * @param {string} field - Field name.
   * @returns {{ true: number, false: number }} Boolean field counts.
   */
  #buildBooleanStats (data, field) {
    return {
      true: data[0]?.[`${field}_true`] || 0,
      false: data[0]?.[`${field}_false`] || 0
    }
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
