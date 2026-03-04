/**
 * @file HATEOAS link builder utility.
 * @module src/utils/HateoasLinkBuilder.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { API_CONFIG } from '../config/apiConfig.js'

/**
 * Builds HATEOAS links for API responses.
 */
export default class HateoasLinkBuilder {
  #baseUrl

  constructor (baseUrl = process.env.API_BASE_URL) {
    this.#baseUrl = baseUrl
  }

  get #apiBase () {
    return `${this.#baseUrl}/${API_CONFIG.PREFIX}/${API_CONFIG.VERSION}`
  }

  buildDogLinks (id, petfinderId, contactState) {
    const links = {
      self: { href: `${this.#apiBase}/dogs/${id}` },
      update: { href: `${this.#apiBase}/dogs/${id}` },
      delete: { href: `${this.#apiBase}/dogs/${id}` },
      location: { href: `${this.#apiBase}/locations/${contactState}` },
      collection: { href: `${this.#apiBase}/dogs` }
    }

    if (petfinderId) {
      links.travel = { href: `${this.#apiBase}/travel/${petfinderId}` }
    }

    return links
  }

  buildTravelLinks (petfinderId) {
    return {
      self: { href: `${this.#apiBase}/travel/${petfinderId}` },
      dog: { href: `${this.#apiBase}/dogs?petfinder_id=${petfinderId}` },
      collection: { href: `${this.#apiBase}/travel` }
    }
  }

  buildLocationLinks (state) {
    return {
      self: { href: `${this.#apiBase}/locations/${state}` },
      collection: { href: `${this.#apiBase}/locations` }
    }
  }

  buildCollectionLinks (resource, page, totalPages) {
    const links = {
      self: { href: `${this.#apiBase}/${resource}?page=${page}` },
      collection: { href: `${this.#apiBase}/${resource}` }
    }

    if (page > 1) {
      links.prev = { href: `${this.#apiBase}/${resource}?page=${page - 1}` }
    }

    if (page < totalPages) {
      links.next = { href: `${this.#apiBase}/${resource}?page=${page + 1}` }
    }

    return links
  }

  buildSimpleCollectionLinks (resource) {
    return {
      self: { href: `${this.#apiBase}/${resource}` }
    }
  }
}
