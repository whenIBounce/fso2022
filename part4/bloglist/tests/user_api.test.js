//import mongoose, supertest, app, helper
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

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
})
//close mongoose connections
afterAll(() => {
	mongoose.connection.close()
})