/**
 * @file Transformer for travel CSV data.
 * @module src/utils/seed/transformers/travelTransformer.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Checks if a value is a valid date string.
 *
 * @param {*} value - Value to check.
 * @returns {boolean} True if valid date.
 */
const isValidDate = (value) => value && !isNaN(new Date(value).getTime())

/**
 * Transforms a raw CSV row into a travel document.
 *
 * @param {object} row - Raw CSV row.
 * @returns {object} Transformed travel document.
 */
const transformTravel = (row) => ({
  petfinder_id: row.id,
  contact_state: row.contact_state || null,
  found: isValidDate(row.found) ? new Date(row.found) : null,
  still_there: row.still_there === 'True'
})

export default transformTravel
