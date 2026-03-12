/**
 * @file Swagger UI configuration.
 * @module src/config/swagger/swaggerConfig.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Loads and parses the OpenAPI YAML specification.
 *
 * @returns {object} Parsed OpenAPI specification.
 */
const loadSwaggerDocument = () => {
  const yamlFile = readFileSync(join(__dirname, 'openapi.yaml'), 'utf8')
  return yaml.load(yamlFile)
}

export const swaggerDocument = loadSwaggerDocument()
