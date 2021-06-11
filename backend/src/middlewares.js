// const jwt = require('jsonwebtoken')

const redis = require('redis')
const JwtRedis = require('jwt-redis').default
const redisClient = redis.createClient()
const jwt = new JwtRedis(redisClient)

errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
  CheckViolationError: 422,
}

function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`)
  res.status('404')
  next(error)
}

function errorHandler(err, req, res, next) {
  const statusCode =
    res.statusCode === 200 ? errorTypes[err.name] || 500 : res.statusCode
  res.status(statusCode)
  res.json({
    status: statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🍑' : err.stack,
    errors: err.errors || undefined,
  })
}

const authCheck = (req, res, next) => {
  req.userId = null

  const auth = req.headers['authorization']

  if (!auth) return next()

  const token = auth.split(' ')[1] // content of Authorization is 'Bearer' followed by blank space followed by token
  if (!token || token === '') return next()

  jwt
    .verify(token, process.env.API_ACCESS_TOKEN)
    .then(token => {
      req.userId = token.userId || null
      req.tokenJti = token.jti
      next()
    })
    .catch(() => next())
}

const loggerHeaders = (req, res, next) => {
  console.log('loggerHeaders:')
  req.headers &&
    Object.keys(req.headers).map(key =>
      console.log(`${key}: ${req.headers[key]}`)
    )
  next()
}

module.exports = {
  notFound,
  errorHandler,
  authCheck,
  loggerHeaders,
}
