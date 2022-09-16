//import mongoose, supertest, app, helper
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})
}, 1000000)
//test
describe('user administration', () => {
	test('invalid users are not created', async () => {
		const usersAtBegin = await helper.usersInDb()
		const invalidUser = {
			username: 'invalid',
			name: 'booger',
			password: '0'
		}
		const response = await api
			.post('/api/users')
			.send(invalidUser)
			.expect(400)
		const usersAtEnd = await helper.usersInDb()
		expect(response.body.error).toEqual('password must have at least three characters')
		expect(usersAtBegin).toHaveLength(usersAtEnd.length)
	}, 100000)

	test('create a valid user', async () => {
		const usersAtBegin = await helper.usersInDb()
		const newUser = {
			username: 'zhenlashi',
			name: 'haoba',
			password: '000000'
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtBegin).toHaveLength(usersAtEnd.length-1)
	}, 100000)
})
//close mongoose connections
afterAll(() => {
	mongoose.connection.close()
})