/**
 * @file Transformer for location CSV data.
 * @module src/utils/seed/transformers/locationTransformer.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Transforms a raw CSV row into a location document.
 *
 * @param {object} row - Raw CSV row.
 * @returns {object} Transformed location document.
 */
const transformLocation = (row) => ({
  location: row.location,
  exported: row.exported ? Number(row.exported) : null,
  imported: row.imported ? Number(row.imported) : null,
  totalInState: row.total ? Number(row.total) : null
})

export default transformLocation
