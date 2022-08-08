//import mongoose, supertest, app
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper')

//get superagent with supertest(app)
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	let promiseArray = blogObjects.map(blogObject => blogObject.save())
	await Promise.all(promiseArray)
}, 1000000)

//start test
test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

//after all close the mongoose connection
afterAll(() => {
	mongoose.connection.close()
})