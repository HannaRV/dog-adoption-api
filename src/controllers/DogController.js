/**
 * @file Controller for handling dog requests.
 * @module src/controllers/DogController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'
import { PAGINATION_DEFAULTS, API_RESOURCES } from '../config/apiConfig.js'
import DogService from '../services/DogService.js'
import HateoasLinkBuilder from '../utils/HateoasLinkBuilder.js'

/**
 * Coordinates dog operations between HTTP layer and dog service.
 */
export default class DogController {
  #dogService
  #hateoasLinkBuilder

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

  async createDog (req, res, next) {
    try {
      const dog = await this.#dogService.createDog(req.body)
      res.status(HTTP_STATUS.CREATED).json(this.#buildDogResponse(dog))
    } catch (error) {
      next(error)
    }
  }

  async updateDog (req, res, next) {
    try {
      const dog = await this.#dogService.updateDog(req.params.id, req.body)
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
}
