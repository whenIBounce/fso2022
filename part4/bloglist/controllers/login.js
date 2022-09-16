//import bcrypy, express().Router, User model
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

//define route handlers
loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body
	const user = await User.findOne({ username })
	const passwordCorrect = user === undefined ? false : await bcrypt.compare(password, user.passwordHash)
	if(!(user&&passwordCorrect)){
		console.log(`user.username: ${user.username}`)
		console.log(`passwordCorrect: ${passwordCorrect}`)
		response.status(401).json({ error: 'invalid username or password' })
	}
	const userForToken = {
		username: user.username,
		id: user._id
	}
	const token = await jwt.sign(userForToken, process.env.SECRET)
	response.status(200).send({ token, username: user.username, name:user.name })
})

//export Router
module.exports = loginRouter