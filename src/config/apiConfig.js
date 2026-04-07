/**
 * @file API configuration constants.
 * @module src/config/apiConfig.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

export const API_CONFIG = {
  PREFIX: 'api',
  VERSION: 'v1'
}

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  PAGE_SIZE: 20
}

export const API_RESOURCES = {
  DOGS: 'dogs',
  TRAVEL: 'travel',
  LOCATIONS: 'locations'
}

export const DOG_BOOLEAN_FIELDS = [
  'house_trained',
  'shots_current',
  'fixed',
  'special_needs',
  'env_children',
  'env_dogs',
  'env_cats'
]

export const US_STATE_CODE_PATTERN = /^[A-Z]{2}$/

export const CACHE_CONTROL = {
  STATISTICS: 'public, max-age=3600',
  DOGS: 'public, max-age=300',
  TRAVEL: 'public, max-age=300',
  LOCATIONS: 'public, max-age=86400'
}
