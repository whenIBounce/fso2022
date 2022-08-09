//import bcrypy, express().Router, User model
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//define route handlers
usersRouter.post('/', async (request, response) => {
	const body = request.body
	const saltRounds = 9
	const passwordHash = await bcrypt.hash(body.password, saltRounds)
	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash: passwordHash
	})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	response.json(users)
})
//export Router
module.exports = usersRouter