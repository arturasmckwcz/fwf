require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

// Graceful shutdown otherwise nodemon doesn't work propoerly all the time
process.on('SIGINT', () => {
  console.log('\n[server] Shutting down on SIGINT')
  server.close()
  process.exit()
})

process.on('SIGTERM', () => {
  console.log('\n[server] Shutting down on SIGTERM')
  server.close()
  process.exit()
})

process.on('uncaughtException', () => {
  console.log('\n[server] Shutting down on uncaughtException')
  server.close()
  process.exit()
})
