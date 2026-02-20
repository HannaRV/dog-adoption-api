import Dog from '../models/Dog.js'

export default class DogRepository {
  #model

  constructor (model = Dog) {
    this.#model = model
  }

  #calculateDogsToSkip (page, dogsPerPage) {
    return (page - 1) * dogsPerPage
  }

  async findAll ({ filter = {}, page = 1, dogsPerPage = 20 }) {
    const dogsToSkip = this.#calculateDogsToSkip(page, dogsPerPage)
    const dogs = await this.#model.find(filter).skip(dogsToSkip).limit(dogsPerPage).lean().exec()
    const totalDogs = await this.#model.countDocuments(filter)
    const totalPages = Math.ceil(totalDogs / dogsPerPage)

    return { dogs, totalDogs, totalPages, page, dogsPerPage }
  }

  async findById (id) {
    return this.#model.findById(id).lean().exec()
  }

  async create (dogData) {
    const dog = new this.#model(dogData)
    return dog.save()
  }

  async update (id, dogData) {
    return this.#model.findByIdAndUpdate(id, dogData, { new: true }).lean().exec()
  }

  async remove (id) {
    return this.#model.findByIdAndDelete(id).lean().exec()
  }
}