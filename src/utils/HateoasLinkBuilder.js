/**
 * @file HATEOAS link builder utility.
 * @module src/utils/HateoasBuilder.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Builds HATEOAS links for API responses.
 */
export default class HateoasBuilder {
  #baseUrl

  constructor (baseUrl = process.env.API_BASE_URL) {
    this.#baseUrl = baseUrl
  }

  buildDogLinks (id, petfinderId, contactState) {
    return {
      self: { href: `${this.#baseUrl}/api/v1/dogs/${id}` },
      update: { href: `${this.#baseUrl}/api/v1/dogs/${id}` },
      delete: { href: `${this.#baseUrl}/api/v1/dogs/${id}` },
      travel: { href: `${this.#baseUrl}/api/v1/travel/${petfinderId}` },
      location: { href: `${this.#baseUrl}/api/v1/locations/${contactState}` },
      collection: { href: `${this.#baseUrl}/api/v1/dogs` }
    }
  }

  buildTravelLinks (petfinderId) {
    return {
      self: { href: `${this.#baseUrl}/api/v1/travel/${petfinderId}` },
      dog: { href: `${this.#baseUrl}/api/v1/dogs?petfinder_id=${petfinderId}` },
      collection: { href: `${this.#baseUrl}/api/v1/travel` }
    }
  }

  buildLocationLinks (state) {
    return {
      self: { href: `${this.#baseUrl}/api/v1/locations/${state}` },
      collection: { href: `${this.#baseUrl}/api/v1/locations` }
    }
  }

  buildCollectionLinks (resource, page, totalPages) {
    const links = {
      self: { href: `${this.#baseUrl}/api/v1/${resource}?page=${page}` },
      collection: { href: `${this.#baseUrl}/api/v1/${resource}` }
    }

    if (page > 1) {
      links.prev = { href: `${this.#baseUrl}/api/v1/${resource}?page=${page - 1}` }
    }

    if (page < totalPages) {
      links.next = { href: `${this.#baseUrl}/api/v1/${resource}?page=${page + 1}` }
    }

    return links
  }
}
