/**
 * @file Defines the base schema.
 * @module src/models/baseSchema
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Creates a new mongoose schema with standardized configuration settings.
 * This base schema provides common functionality like timestamps and
 * is intended to be cloned and extended by all models.
 *
 * Note: toJSON transform is intentionally omitted — all repositories use
 * .lean() which bypasses Mongoose's transform pipeline. Data transformation
 * is handled explicitly via #mapToResponseFormat in each controller.
 *
 * @constant {mongoose.Schema} BASE_SCHEMA
 */
const baseSchema = new mongoose.Schema({}, {
  timestamps: true
})

export const BASE_SCHEMA = Object.freeze(baseSchema)
