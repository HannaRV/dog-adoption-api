import Location from '../models/Location.js'

export default class LocationRepository {
  async findAll () {
    return Location.find()
  }

  async findByState (state) {
    return Location.findOne({ location: state })
  }
}