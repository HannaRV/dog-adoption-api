# 🐾 Dog Adoption API

[![Node.js](https://img.shields.io/badge/node.js-v20%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-5.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/mongodb-atlas-green)](https://www.mongodb.com/atlas)
[![Docker](https://img.shields.io/badge/docker-deployed-blue)](https://www.docker.com/)
[![CI/CD](https://github.com/HannaRV/dog-adoption-api/actions/workflows/test.yml/badge.svg)](https://github.com/HannaRV/dog-adoption-api/actions)
[![License](https://img.shields.io/badge/license-ISC-lightgrey)](LICENSE)

> 📚 This project was developed as part of the course **1DV027 — Webben som applikationsplattform** at Linnaeus University (LNU).

A RESTful API for browsing and managing adoptable dogs in the United States. Built with Node.js, Express and MongoDB Atlas. The dataset contains ~58,000 dogs sourced from Petfinder via Kaggle.

**Live API:** https://dog-adoption-api.duckdns.org/api/v1  
**Interactive Documentation:** https://dog-adoption-api.duckdns.org/api-docs

---

## Features

- Full CRUD for dog listings
- Read-only access to travel records and location statistics
- JWT authentication for write operations
- HATEOAS links on all responses
- Filtering and pagination
- Swagger/OpenAPI interactive documentation
- Automated tests via Postman/Newman in CI/CD pipeline

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js / Express | REST API framework |
| MongoDB Atlas | Cloud-hosted database |
| Mongoose | Schema validation and query abstraction |
| JWT (jsonwebtoken) | Stateless authentication |
| Docker | Containerized deployment on DigitalOcean |
| nginx | Reverse proxy with HTTPS |
| GitHub Actions | CI/CD — lint, tests, manual deploy |
| Newman | Automated Postman test runner |
| swagger-ui-express | Interactive API documentation |
| js-yaml | OpenAPI YAML specification parser |
| express-rate-limit | Rate limiting |
| helmet | HTTP security headers |

---

## Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/v1/dogs | — | List all dogs (filterable, paginated) |
| GET | /api/v1/dogs/:id | — | Get a single dog |
| GET | /api/v1/dogs/:id/travel | — | Get travel records for a dog |
| POST | /api/v1/dogs | ✅ JWT | Create a dog |
| PUT | /api/v1/dogs/:id | ✅ JWT | Update a dog |
| DELETE | /api/v1/dogs/:id | ✅ JWT | Delete a dog |
| GET | /api/v1/travel | — | List all travel records (paginated) |
| GET | /api/v1/travel/:petfinderId | — | Get travel by Petfinder ID |
| GET | /api/v1/locations | — | List all US state locations |
| GET | /api/v1/locations/:state | — | Get location by state |
| POST | /api/v1/auth/register | — | Register a new user |
| POST | /api/v1/auth/login | — | Log in and receive JWT |

### Filtering (GET /dogs)

| Parameter | Example |
|---|---|
| breedPrimary | ?breedPrimary=Labrador Retriever |
| age | ?age=Adult |
| sex | ?sex=Male |
| size | ?size=Large |
| page | ?page=2 |
| limit | ?limit=20 |

---

## Getting Started

### Prerequisites

- Node.js v20+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
git clone https://github.com/HannaRV/dog-adoption-api.git
cd dog-adoption-api
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
API_BASE_URL=http://localhost:3000
CSV_PATH_DOGS=data/allDogDescriptions.csv
CSV_PATH_TRAVEL=data/dogTravel.csv
CSV_PATH_LOCATIONS=data/movesByLocation.csv
```

### Seed the Database

```bash
npm run seed
```

### Run the API

```bash
npm start        # Production
npm run dev      # Development with nodemon
```

---

## Testing

Run the full Postman test suite against the production API:

```bash
npx newman run postman/dog-adoption-api.postman_collection.json -e postman/production.postman_environment.json
```

Or check the CI/CD pipeline results in [GitHub Actions](https://github.com/HannaRV/dog-adoption-api/actions).

---

## Security

| Measure | Implementation |
|---|---|
| Password hashing | bcryptjs with salt rounds |
| Authentication | JWT — stateless, configurable expiry |
| Security headers | Helmet middleware |
| Rate limiting | 100 requests per 15 minutes per IP |
| CORS | Configured via cors middleware |
| Over-posting protection | `#filterAllowedFields` in all write operations |
| Database access | MongoDB Atlas IP whitelist |
| Reverse proxy | nginx with HTTPS, `server_tokens off` |
| Firewall | UFW blocks port 3000 externally |
| Secrets | Environment variables, not committed to version control |

---

## Dataset

| Resource | Description |
|---|---|
| Dogs (primary, CRUD) | ~58,000 records from Petfinder via Kaggle |
| Travel (read-only) | ~6,200 transport records per dog |
| Locations (read-only) | 90 US state adoption statistics |

Source: [Adoptable Dogs in the US — Kaggle](https://www.kaggle.com/datasets/thedevastator/adoptable-dogs-in-the-us)

---

## Acknowledgements

- Dataset: [Adoptable Dogs in the US — Kaggle](https://www.kaggle.com/datasets/thedevastator/adoptable-dogs-in-the-us)
- Course examples by Mats Loock (LNU) for architectural reference
- Course guidance and lectures by Oxana Lundström (LNU)

---

## Author

**Hanna Rubio Vretby**  
hr222sy@student.lnu.se  
Linnaeus University