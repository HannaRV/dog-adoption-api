/**
 * @file Service for travel record business logic.
 * @module src/services/TravelService.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import TravelRepository from '../repositories/TravelRepository.js'
import NotFoundError from '../utils/errors/NotFoundError.js'
import { PAGINATION_DEFAULTS } from '../config/apiConfig.js'

export default class TravelService {
  #travelRepository

  constructor (travelRepository = new TravelRepository()) {
    this.#travelRepository = travelRepository
  }

  async getAllTravelRecords ({ page = PAGINATION_DEFAULTS.PAGE, travelsPerPage = PAGINATION_DEFAULTS.PAGE_SIZE }) {
    return this.#travelRepository.findAll({ page, travelsPerPage })
  }

  async getTravelRecordByPetfinderId (petfinderId) {
    const travelRecord = await this.#travelRepository.findOneByPetfinderId(petfinderId)
    this.#throwIfTravelNotFound(travelRecord)
    return travelRecord
  }

  #throwIfTravelNotFound (travelRecord) {
    if (!travelRecord) {
      throw new NotFoundError('Travel record not found')
    }
  }
}
