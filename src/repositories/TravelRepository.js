/**
 * @file Repository for travel record data access.
 * @module src/repositories/TravelRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import Travel from '../models/Travel.js'

export default class TravelRepository {
  #model

  constructor (model = Travel) {
    this.#model = model
  }

  #calculateTravelsToSkip (page, travelsPerPage) {
    return (page - 1) * travelsPerPage
  }

  async findAll ({ page = 1, travelsPerPage = 20 }) {
    const travelsToSkip = this.#calculateTravelsToSkip(page, travelsPerPage)
    const travelRecords = await this.#model.find().skip(travelsToSkip).limit(travelsPerPage).lean().exec()
    const totalTravels = await this.#model.countDocuments()
    const totalPages = Math.ceil(totalTravels / travelsPerPage)

    return { travelRecords, totalTravels, totalPages, page, travelsPerPage }
  }

  async findByPetfinderId (petfinderId) {
    return this.#model.findOne({ petfinder_id: petfinderId }).lean().exec()
  }

  async removeByPetfinderId (petfinderId) {
    return this.#model.deleteOne({ petfinder_id: petfinderId })
  }
}