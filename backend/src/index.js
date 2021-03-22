const app = require('./app')
const port = process.env.PORT || 8000

const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

// Graceful shutdown otherwise nodemon doesn't work propoerly all the time
process.on('SIGINT', () => {
  console.log('\n[server] Shutting down...')
  server.close()
  process.exit()
})

process.on('SIGTERM', () => {
  console.log('\n[server] Shutting down...')
  server.close()
  process.exit()
})

process.on('uncaughtException', () => {
  console.log('\n[server] Shutting down...')
  server.close()
  process.exit()
})
