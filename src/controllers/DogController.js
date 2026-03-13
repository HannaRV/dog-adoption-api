/**
 * @file Controller for handling dog requests.
 * @module src/controllers/DogController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'
import { PAGINATION_DEFAULTS, API_RESOURCES, API_CONFIG } from '../config/apiConfig.js'
import DogService from '../services/DogService.js'
import HateoasLinkBuilder from '../utils/HateoasLinkBuilder.js'

export default class DogController {
  #dogService
  #hateoasLinkBuilder
  #allowedDogFields = [
    'name', 'breed_primary', 'age', 'sex', 'size', 'coat',
    'fixed', 'house_trained', 'special_needs', 'shots_current',
    'env_children', 'env_dogs', 'env_cats', 'contact_state', 'description'
  ]

  constructor (
    dogService = new DogService(),
    hateoasLinkBuilder = new HateoasLinkBuilder()
  ) {
    this.#dogService = dogService
    this.#hateoasLinkBuilder = hateoasLinkBuilder
  }

  async getAllDogs (req, res, next) {
    try {
      const query = this.#buildQuery(req)
      const result = await this.#dogService.getAllDogs(query)
      res.status(HTTP_STATUS.OK).json(this.#buildCollectionResponse(result))
    } catch (error) {
      next(error)
    }
  }

  async getDogById (req, res, next) {
    try {
      const dog = await this.#dogService.getDogById(req.params.id)
      res.status(HTTP_STATUS.OK).json(this.#buildDogResponse(dog))
    } catch (error) {
      next(error)
    }
  }

  async getDogTravelById (req, res, next) {
    try {
      const travelRecords = await this.#dogService.getDogTravelById(req.params.id)
      res.status(HTTP_STATUS.OK).json(this.#buildDogTravelResponse(travelRecords))
    } catch (error) {
      next(error)
    }
  }

  async createDog (req, res, next) {
    try {
      const dogData = this.#filterAllowedFields(req.body)
      const dog = await this.#dogService.createDog(dogData)
      res.location(`${req.protocol}://${req.get('host')}/${API_CONFIG.PREFIX}/${API_CONFIG.VERSION}/dogs/${dog._id}`)
        .status(HTTP_STATUS.CREATED)
        .json(this.#buildDogResponse(dog))
    } catch (error) {
      next(error)
    }
  }

  async updateDog (req, res, next) {
    try {
      const dogData = this.#filterAllowedFields(req.body)
      const dog = await this.#dogService.updateDog(req.params.id, dogData)
      res.status(HTTP_STATUS.OK).json(this.#buildDogResponse(dog))
    } catch (error) {
      next(error)
    }
  }

  async removeDog (req, res, next) {
    try {
      await this.#dogService.removeDog(req.params.id)
      res.status(HTTP_STATUS.NO_CONTENT).send()
    } catch (error) {
      next(error)
    }
  }

  #filterAllowedFields (body) {
    return Object.fromEntries(
      this.#allowedDogFields
        .filter(key => key in body)
        .map(key => [key, body[key]])
    )
  }

  #buildQuery (req) {
    return {
      filter: this.#buildFilter(req.query),
      page: Number(req.query.page) || PAGINATION_DEFAULTS.PAGE,
      dogsPerPage: Number(req.query.limit) || PAGINATION_DEFAULTS.PAGE_SIZE
    }
  }

  #buildFilter ({ breedPrimary, age, sex, size }) {
    const filter = {}
    if (breedPrimary) filter.breed_primary = breedPrimary
    if (age) filter.age = age
    if (sex) filter.sex = sex
    if (size) filter.size = size
    return filter
  }

  #mapToResponseFormat (dog) {
    return {
      id: dog._id,
      name: dog.name,
      breedPrimary: dog.breed_primary,
      breedMixed: dog.breed_mixed,
      colorPrimary: dog.color_primary,
      age: dog.age,
      sex: dog.sex,
      size: dog.size,
      coat: dog.coat,
      fixed: dog.fixed,
      houseTrained: dog.house_trained,
      specialNeeds: dog.special_needs,
      shotsCurrent: dog.shots_current,
      envChildren: dog.env_children,
      envDogs: dog.env_dogs,
      envCats: dog.env_cats,
      contactState: dog.contact_state,
      description: dog.description
    }
  }

  #mapTravelToResponseFormat (travelRecord) {
    return {
      id: travelRecord._id,
      petfinderId: travelRecord.petfinder_id,
      contactState: travelRecord.contact_state,
      found: travelRecord.found,
      stillThere: travelRecord.still_there
    }
  }

  #buildDogResponse (dog) {
    const dogResponse = this.#mapToResponseFormat(dog)
    return {
      ...dogResponse,
      _links: this.#hateoasLinkBuilder.buildDogLinks(dogResponse.id, dog.petfinder_id, dog.contact_state)
    }
  }

  #buildCollectionResponse (result) {
    return {
      dogs: result.dogs.map(dog => this.#buildDogResponse(dog)),
      _pagination: this.#buildPagination(result),
      _links: this.#hateoasLinkBuilder.buildCollectionLinks(API_RESOURCES.DOGS, result.page, result.totalPages)
    }
  }

  #buildPagination (result) {
    return {
      totalDogs: result.totalDogs,
      totalPages: result.totalPages,
      page: result.page,
      dogsPerPage: result.dogsPerPage
    }
  }

  #buildDogTravelResponse (travelRecords) {
    return {
      travelRecords: travelRecords.map(record => ({
        ...this.#mapTravelToResponseFormat(record),
        _links: this.#hateoasLinkBuilder.buildTravelLinks(record.petfinder_id)
      }))
    }
  }
}
