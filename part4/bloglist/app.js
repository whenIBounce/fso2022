const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI
mongoose
	.connect(mongoUrl)
	.then(() => logger.info('connected to MONGODB'))
	.catch(err => logger.error(err))

app.use(express.json())
app.use(middleware.requestLogger)
//app.use(middleware.tokenExtractor)
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

