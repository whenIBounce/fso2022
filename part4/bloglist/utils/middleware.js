const logger = require('./logger')
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
	}
	next(error)
}

const tokenExtractor = (request, response, next) => {
	let token = ''
	//get authorization header from request
	const auth = request.get('authorization')
	//if header exists && authScheme is Bearer, extract token
	if(auth && auth.startsWith('Bearer ')){
		token = auth.substring(7)
		//put the token in request's field
	}
	request.token = token
	//console.log(`request.token ${JSON.stringify(request.token)}`)
	next()
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor }