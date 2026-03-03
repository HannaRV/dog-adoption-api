/**
 * @file Seed script for populating the database with CSV data.
 * @module src/utils/seed/seed.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import connectMongoose from '../../config/mongoose.js'
import DogLoader from './loaders/dogLoader.js'
import TravelLoader from './loaders/travelLoader.js'
import LocationLoader from './loaders/locationLoader.js'
import transformDog from './transformers/dogTransformer.js'
import transformTravel from './transformers/travelTransformer.js'
import transformLocation from './transformers/locationTransformer.js'

const BATCH_SIZE = 1000
const CSV_PATHS = {
  dogs: process.env.CSV_PATH_DOGS || 'data/allDogDescriptions.csv',
  travel: process.env.CSV_PATH_TRAVEL || 'data/dogTravel.csv',
  locations: process.env.CSV_PATH_LOCATIONS || 'data/movesByLocation.csv'
}

/**
 * Streams a CSV file and loads transformed rows in batches.
 *
 * @param {string} csvPath - Path to CSV file.
 * @param {Function} transformer - Row transformer function.
 * @param {object} loader - Loader instance with load() method.
 * @param {string} resourceName - Name for logging.
 */
const seedResource = (csvPath, transformer, loader, resourceName) => {
  return new Promise((resolve, reject) => {
    const batch = []
    let totalRows = 0

    const parser = fs.createReadStream(path.resolve(csvPath))
      .pipe(parse({ columns: true, skip_empty_lines: true }))

    parser.on('data', async (row) => {
      batch.push(transformer(row))

      if (batch.length === BATCH_SIZE) {
        parser.pause()
        await loader.load(batch.splice(0, BATCH_SIZE))
        totalRows += BATCH_SIZE
        console.log(`${resourceName}: ${totalRows} rows inserted...`)
        parser.resume()
      }
    })

    parser.on('end', async () => {
      if (batch.length > 0) {
        await loader.load(batch)
        totalRows += batch.length
      }
      console.log(`${resourceName}: done — ${totalRows} total rows inserted`)
      resolve()
    })

    parser.on('error', reject)
  })
}

/**
 * Runs the full seed pipeline.
 */
const seed = async () => {
  await connectMongoose()

  const dogLoader = new DogLoader()
  const travelLoader = new TravelLoader()
  const locationLoader = new LocationLoader()

  console.log('Clearing existing data...')
  await dogLoader.clear()
  await travelLoader.clear()
  await locationLoader.clear()

  console.log('Seeding dogs...')
  await seedResource(CSV_PATHS.dogs, transformDog, dogLoader, 'Dogs')

  console.log('Seeding travel records...')
  await seedResource(CSV_PATHS.travel, transformTravel, travelLoader, 'Travel')

  console.log('Seeding locations...')
  await seedResource(CSV_PATHS.locations, transformLocation, locationLoader, 'Locations')

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
