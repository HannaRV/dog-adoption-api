/**
 * @file Authentication routes.
 * @module src/routes/authenticationRouter.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import AuthenticationController from '../controllers/AuthenticationController.js'

const authenticationController = new AuthenticationController()

export const router = express.Router()

router.post('/register', (req, res, next) => authenticationController.register(req, res, next))
router.post('/login', (req, res, next) => authenticationController.login(req, res, next))
