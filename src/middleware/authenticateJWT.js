/**
 * @file JWT authentication middleware.
 * @module src/middleware/authenticateJWT.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import UnauthorizedError from '../utils/errors/UnauthorizedError.js'

const verifyToken = (authorizationHeader) => {
  const headerIsMissing = !authorizationHeader
  const headerDoesNotStartWithBearer = !authorizationHeader.startsWith('Bearer ')

  if (headerIsMissing || headerDoesNotStartWithBearer) {
    throw new UnauthorizedError('No token provided')
  }

  const token = authorizationHeader.split(' ')[1]
  return jwt.verify(token, process.env.JWT_SECRET)
}

const authenticateJWT = (req, res, next) => {
  try {
    const decodedToken = verifyToken(req.headers.authorization)
    req.user = decodedToken
    next()
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired token'))
  }
}

export default authenticateJWT