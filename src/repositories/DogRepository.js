import Dog from '../models/Dog.js'

export default class DogRepository {
  #calculateDogsToSkip (page, dogsPerPage) {
    return (page - 1) * dogsPerPage
  }

  async findAll ({ filter = {}, page = 1, dogsPerPage = 20 }) {
    const dogsToSkip = this.#calculateDogsToSkip(page, dogsPerPage)
    const dogs = await Dog.find(filter).skip(dogsToSkip).limit(dogsPerPage)
    const totalDogs = await Dog.countDocuments(filter)
    const totalPages = Math.ceil(totalDogs / dogsPerPage)

    return { dogs, totalDogs, totalPages, page, dogsPerPage }
  }

  async findById (id) {
    return Dog.findById(id)
  }

  async create (dogData) {
    const dog = new Dog(dogData)
    return dog.save()
  }

  async update (id, dogData) {
    return Dog.findByIdAndUpdate(id, dogData, { new: true })
  }

  async remove (id) {
    return Dog.findByIdAndDelete(id)
  }
}