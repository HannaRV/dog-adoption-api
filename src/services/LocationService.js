import LocationRepository from '../repositories/LocationRepository.js'
import NotFoundError from '../utils/errors/NotFoundError.js'

export default class LocationService {
  #locationRepository

  constructor () {
    this.#locationRepository = new LocationRepository()
  }

  async getAllLocations () {
    return this.#locationRepository.findAll()
  }

  async getLocationByState (state) {
    const location = await this.#locationRepository.findByState(state)

    if (!location) {
      throw new NotFoundError('Location not found')
    }

    return location
  }
}