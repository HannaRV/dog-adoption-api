import Location from '../models/Location.js'

export default class LocationRepository {
  #model

  constructor (model = Location) {
    this.#model = model
  }

  async findAll () {
    return this.#model.find().lean().exec()
  }

  async findByState (state) {
    return this.#model.findOne({ location: state }).lean().exec()
  }
}