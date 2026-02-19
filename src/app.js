import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(errorHandler)

export default app