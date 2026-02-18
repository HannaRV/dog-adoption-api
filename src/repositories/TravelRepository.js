import Travel from '../models/Travel.js'

export default class TravelRepository {
  #calculateTravelsToSkip (page, travelsPerPage) {
    return (page - 1) * travelsPerPage
  }

  async findAll ({ page = 1, travelsPerPage = 20 }) {
    const travelsToSkip = this.#calculateTravelsToSkip(page, travelsPerPage)
    const travelRecords = await Travel.find().skip(travelsToSkip).limit(travelsPerPage)
    const totalTravels = await Travel.countDocuments()
    const totalPages = Math.ceil(totalTravels / travelsPerPage)

    return { travelRecords, totalTravels, totalPages, page, travelsPerPage }
  }

  async findByPetfinderId (petfinderId) {
    return Travel.findOne({ petfinder_id: petfinderId })
  }

  async removeByPetfinderId (petfinderId) {
    return Travel.deleteOne({ petfinder_id: petfinderId })
  }
}