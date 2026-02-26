/**
 * @file Controller for handling dog requests.
 * @module src/controllers/DogController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'
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
      page: Number(req.query.page) || 1,
      dogsPerPage: Number(req.query.limit) || 20
    }
  }

  #buildFilter ({ breed_primary, age, sex, size }) {
    const filter = {}
    if (breed_primary) filter.breed_primary = breed_primary
    if (age) filter.age = age
    if (sex) filter.sex = sex
    if (size) filter.size = size
    return filter
  }

  #buildDogResponse (dog) {
    return {
      ...dog,
      _links: this.#hateoasLinkBuilder.buildDogLinks(dog._id, dog.petfinder_id, dog.contact_state)
    }
  }

  #buildCollectionResponse (result) {
    return {
      dogs: result.dogs.map(dog => this.#buildDogResponse(dog)),
      _pagination: this.#buildPagination(result),
      _links: this.#hateoasLinkBuilder.buildCollectionLinks('dogs', result.page, result.totalPages)
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