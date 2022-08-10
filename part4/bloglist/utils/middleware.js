const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: error.message })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' })
	}
	next(error)
}

const tokenExtractor = (request, response, next) => {
	//get authorization header from request
	const auth = request.get('authorization')
	//if header exists && authScheme is Bearer, extract token
	if(auth && auth.startsWith('Bearer ')){
		//put the token in request's field
		request.token  = auth.substring(7)
	}else{
		return response.status(401).json({ error:'token missing' })
	}
	next()
}

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if(decodedToken.id){
		const user = await User.findById(decodedToken.id)
		if(!user){
			return response.status(400).json({ error: 'null user' })
		}else{
			request.user = user
		}
	}else{
		return response.status(401).json({ error: 'invalid token' })
	}
	next()
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }