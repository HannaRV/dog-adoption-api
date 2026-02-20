import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/UserRepository.js'
import UnauthorizedError from '../utils/errors/UnauthorizedError.js'
import ValidationError from '../utils/errors/ValidationError.js'

export default class JWTAuthService {
  #userRepository

  constructor (userRepository = new UserRepository()) {
    this.#userRepository = userRepository
  }

  #generateToken (userId) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )
  }

  async register (username, email, password) {
    const existingUser = await this.#userRepository.findByEmail(email)
    const emailAlreadyExists = Boolean(existingUser)

    if (emailAlreadyExists) {
      throw new ValidationError('Email already in use')
    }

    const user = await this.#userRepository.create({ username, email, password })
    const token = this.#generateToken(user._id)
    return { token }
  }

  async login (email, password) {
    const user = await this.#userRepository.findByEmail(email)
    const userWasNotFound = !user

    if (userWasNotFound) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const passwordIsCorrect = await user.comparePassword(password)

    if (!passwordIsCorrect) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const token = this.#generateToken(user._id)
    return { token }
  }
}