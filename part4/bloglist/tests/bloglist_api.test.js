//import mongoose, supertest, app
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
//get superagent with supertest(app)
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	let promiseArray = blogObjects.map(blogObject => blogObject.save())
	await Promise.all(promiseArray)
}, 100000)

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

test('identifier property of the blog posts is named id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
}, 100000)

test('creates a new blog post', async () => {
	const blogToSave = {
		title: 'test HTTP POST',
		author: 'Lao Chang',
		url: 'https://magicTiaTia.com/',
		likes: 7,
	}
	await api
		.post('/api/blogs')
		.send(blogToSave)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
	const titles = blogsAtEnd.map(blog => blog.title)
	expect(titles).toContain('test HTTP POST')
}, 100000)

test('likes property is missing from the HTTP POST request', async () => {
	const blogWithoutLikes = {
		title: 'test HTTP POST without likes property',
		author: 'Lao Chang',
		url: 'https://magicTiaTia.com/',
	}
	const response = await api
		.post('/api/blogs')
		.send(blogWithoutLikes)
	expect(response.body.likes).toBe(0)
}, 100000)

test('title and url properties are missing from the HTTP POST request', async () => {
	const blogWithoutTitleAndUrl = {
		author: 'Lao Chang',
	}
	await api
		.post('/api/blogs')
		.send(blogWithoutTitleAndUrl)
		.expect(400)
}, 100000)

//after all close the mongoose connection
afterAll(() => {
	mongoose.connection.close()
})