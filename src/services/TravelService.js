/**
 * @file Service for travel record business logic.
 * @module src/services/TravelService.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import TravelRepository from '../repositories/TravelRepository.js'
import NotFoundError from '../utils/errors/NotFoundError.js'

export default class TravelService {
  #travelRepository

  constructor (travelRepository = new TravelRepository()) {
    this.#travelRepository = travelRepository
  }

  #throwIfTravelNotFound (travelRecord) {
    if (!travelRecord) {
      throw new NotFoundError('Travel record not found')
    }
  }

  async getAllTravelRecords ({ page = 1, travelsPerPage = 20 }) {
    return this.#travelRepository.findAll({ page, travelsPerPage })
  }

  async getTravelRecordByPetfinderId (petfinderId) {
    const travelRecord = await this.#travelRepository.findByPetfinderId(petfinderId)
    this.#throwIfTravelNotFound(travelRecord)
    return travelRecord
  }
}