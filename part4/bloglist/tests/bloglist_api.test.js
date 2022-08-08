//import mongoose, supertest, app
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

//get superagent with supertest(app)
const api = supertest(app)

//start test
test('get /api/blogs', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000)

//after all close the mongoose connection
afterAll(() => {
	mongoose.connection.close()
})