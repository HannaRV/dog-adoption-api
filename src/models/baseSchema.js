/**
 * @file Defines the base schema.
 * @module src/models/baseSchema
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const baseSchema = new mongoose.Schema({}, {
  timestamps: true
})

/**
 * Base schema with timestamps, intended to be cloned by all models.
 *
 * Note: toJSON transform is intentionally omitted — all repositories use
 * .lean() which bypasses Mongoose's transform pipeline. Data transformation
 * is handled explicitly via #mapToResponseFormat in each controller.
 */
export const BASE_SCHEMA = Object.freeze(baseSchema)
