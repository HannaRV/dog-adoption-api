/**
 * @file Controller for handling location requests.
 * @module src/controllers/LocationController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'
import { API_RESOURCES } from '../config/apiConfig.js'
import LocationService from '../services/LocationService.js'
import HateoasLinkBuilder from '../utils/HateoasLinkBuilder.js'

export default class LocationController {
  #locationService
  #hateoasLinkBuilder

  constructor (
    locationService = new LocationService(),
    hateoasLinkBuilder = new HateoasLinkBuilder()
  ) {
    this.#locationService = locationService
    this.#hateoasLinkBuilder = hateoasLinkBuilder
  }

  async getAllLocations (req, res, next) {
    try {
      const locations = await this.#locationService.getAllLocations()
      res.status(HTTP_STATUS.OK).json(this.#buildCollectionResponse(locations))
    } catch (error) {
      next(error)
    }
  }

  async getLocationByState (req, res, next) {
    try {
      const location = await this.#locationService.getLocationByState(req.params.state)
      res.status(HTTP_STATUS.OK).json(this.#buildLocationResponse(location))
    } catch (error) {
      next(error)
    }
  }

  #mapToResponseFormat (location) {
    return {
      id: location._id,
      location: location.location,
      exported: location.exported,
      imported: location.imported,
      totalInState: location.totalInState
    }
  }

  #buildLocationResponse (location) {
    const locationResponse = this.#mapToResponseFormat(location)
    return {
      ...locationResponse,
      _links: this.#hateoasLinkBuilder.buildLocationLinks(locationResponse.location)
    }
  }

  #buildCollectionResponse (locations) {
    return {
      locations: locations.map(location => this.#buildLocationResponse(location)),
      _links: this.#hateoasLinkBuilder.buildSimpleCollectionLinks(API_RESOURCES.LOCATIONS)
    }
  }
}
