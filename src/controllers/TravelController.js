/**
 * @file Controller for handling travel requests.
 * @module src/controllers/TravelController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'
import { PAGINATION_DEFAULTS, API_RESOURCES } from '../config/apiConfig.js'
import TravelService from '../services/TravelService.js'
import HateoasLinkBuilder from '../utils/HateoasLinkBuilder.js'

export default class TravelController {
  #travelService
  #hateoasLinkBuilder

  constructor (
    travelService = new TravelService(),
    hateoasLinkBuilder = new HateoasLinkBuilder()
  ) {
    this.#travelService = travelService
    this.#hateoasLinkBuilder = hateoasLinkBuilder
  }

  async getAllTravelRecords (req, res, next) {
    try {
      const query = this.#buildQuery(req)
      const result = await this.#travelService.getAllTravelRecords(query)
      res.status(HTTP_STATUS.OK).json(this.#buildCollectionResponse(result))
    } catch (error) {
      next(error)
    }
  }

  async getTravelRecordByPetfinderId (req, res, next) {
    try {
      const travelRecord = await this.#travelService.getTravelRecordByPetfinderId(req.params.petfinderId)
      res.status(HTTP_STATUS.OK).json(this.#buildTravelResponse(travelRecord))
    } catch (error) {
      next(error)
    }
  }

  #buildQuery (req) {
    return {
      page: Number(req.query.page) || PAGINATION_DEFAULTS.PAGE,
      travelsPerPage: Number(req.query.limit) || PAGINATION_DEFAULTS.PAGE_SIZE
    }
  }

  #mapToResponseFormat (travelRecord) {
    return {
      id: travelRecord._id,
      petfinderId: travelRecord.petfinder_id,
      contactState: travelRecord.contact_state,
      found: travelRecord.found,
      stillThere: travelRecord.still_there
    }
  }

  #buildTravelResponse (travelRecord) {
    const travelResponse = this.#mapToResponseFormat(travelRecord)
    return {
      ...travelResponse,
      _links: this.#hateoasLinkBuilder.buildTravelLinks(travelResponse.petfinderId)
    }
  }

  #buildCollectionResponse (result) {
    return {
      travelRecords: result.travelRecords.map(record => this.#buildTravelResponse(record)),
      _pagination: this.#buildPagination(result),
      _links: this.#hateoasLinkBuilder.buildCollectionLinks(API_RESOURCES.TRAVEL, result.page, result.totalPages)
    }
  }

  #buildPagination (result) {
    return {
      totalTravels: result.totalTravels,
      totalPages: result.totalPages,
      page: result.page,
      travelsPerPage: result.travelsPerPage
    }
  }
}
