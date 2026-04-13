/**
 * @file Transformer for dog CSV data.
 * @module src/utils/seed/transformers/dogTransformer.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Transforms a raw CSV row into a dog document.
 *
 * @param {object} row - Raw CSV row.
 * @returns {object} Transformed dog document.
 */
const transformDog = (row) => ({
  petfinder_id: row.id,
  name: sanitizeName(row.name),
  breed_primary: row.breed_primary || null,
  breed_mixed: row.breed_mixed === 'True',
  color_primary: row.color_primary || null,
  age: row.age || null,
  sex: row.sex || null,
  size: row.size || null,
  coat: row.coat || null,
  fixed: row.fixed === 'True',
  house_trained: row.house_trained === 'True',
  special_needs: row.special_needs === 'True',
  shots_current: row.shots_current === 'True',
  env_children: row.env_children === 'True',
  env_dogs: row.env_dogs === 'True',
  env_cats: row.env_cats === 'True',
  contact_state: row.contact_state || null,
  description: row.description || null
})

/**
 * Sanitizes a dog name by removing embedded descriptions and courtesy listing markers.
 *
 * @param {string} name - Raw dog name from dataset.
 * @returns {string} Cleaned dog name.
 */
const sanitizeName = (name) => {
  if (!name) return 'Unknown'
  return name
    .replace(/\*[^*]*\*/gi, '')
    .replace(/[-–—,]?\s*courtesy\s*(post(ing)?|list(ing)?)?/gi, '')
    .replace(/\*+/g, '')
    .replace(/zz\s*/gi, '')
    .replace(/\\/g, '')
    .replace(/\s+/g, ' ')
    .trim() || 'Unknown'
}

export default transformDog
