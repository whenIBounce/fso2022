//import bcrypy, express().Router, User model
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//define route handlers
usersRouter.post('/', async (request, response) => {
	const body = request.body
	if(body.password.length < 3){
		response.status(400).json({ error: 'password must have at least three characters' })
	}
	const username = body.username
	const existingUser = await User.findOne({ username })
	if(existingUser){
		response.status(400).json({ error: 'username must be unique' })
	}
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
	const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
	response.json(users)
})
//export Router
module.exports = usersRouter