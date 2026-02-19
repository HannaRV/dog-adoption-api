import 'dotenv/config'
import app from './app.js'
import connectDatabase from './config/database.js'

const PORT = process.env.PORT || 3000

await connectDatabase()

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const shutDownGracefully = (signal) => {
  console.log(`${signal} received, shutting down gracefully`)
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
}

process.on('SIGTERM', () => shutDownGracefully('SIGTERM'))
process.on('SIGINT', () => shutDownGracefully('SIGINT'))