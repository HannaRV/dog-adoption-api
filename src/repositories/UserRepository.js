import User from '../models/User.js'

export default class UserRepository {
  async findByEmail (email) {
    return User.findOne({ email })
  }

  async create (userData) {
    const user = new User(userData)
    return user.save()
  }
}