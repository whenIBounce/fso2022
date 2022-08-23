//import mongoose, supertest, app
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
//get superagent with supertest(app)
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
let token = null

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	token = await helper.createAndLoginUser()
	// let blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	// let promiseArray = blogObjects.map(blogObject => blogObject.save())
	// await Promise.all(promiseArray)
}, 1000000)

//start test

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('identifier property of the blog posts is named id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
}, 100000)

test('creates a blog with a token', async () => {

	const blogToSave = {
		title: 'create a blog with a valid token',
		author: 'Lao Chang',
		url: 'https://magicTiaTia.com/',
		likes: 54545,
	}

	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(blogToSave)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(1)
	const titles = blogsAtEnd.map(blog => blog.title)
	expect(titles).toContain('create a new blog with token')

}, 100000)

test('creates a blog without a token', async () => {
	token = ''
	const blogToSave = {
		title: 'create a new blog without a valid token',
		author: 'Lao Chang',
		url: 'https://magicTiaTia.com/',
		likes: 54545,
	}

	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(blogToSave)
		.expect(401)

}, 100000)


test('creates a blog without like property', async () => {
	const blogWithoutLikes = {
		title: 'test HTTP POST without likes property',
		author: 'Lao Chang',
		url: 'https://magicTiaTia.com/',
	}
	const response = await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(blogWithoutLikes)

	expect(response.body.likes).toBe(0)
}, 100000)

test('creates a blog without title and url properties', async () => {
	const blogWithoutTitleAndUrl = {
		author: 'Lao Chang',
	}
	await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(blogWithoutTitleAndUrl)
		.expect(400)
}, 100000)

test('delete a blog, the creator and the deletor is the same user', async () => {
	// const blogsAtBegin = await helper.blogsInDb()
	// const idToBeDeleted = blogsAtBegin[0].id
	// await api
	// 	.delete(`/api/blogs/${idToBeDeleted}`)
	// 	.expect(204)
	// const blogsAtEnd = await helper.blogsInDb()
	// expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
	const tmpBlog = 	{
		title: 'tmp blog',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	}
	const response = await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(tmpBlog)
	const tmpBlogId = response.body.id
	await api
		.delete(`/api/blogs/${tmpBlogId}`)
		.set('Authorization', `Bearer ${token}`)
		.expect(204)
}, 100000)

test('update a blog, the creator and the updater is the same user', async () => {
	// const blogsAtBegin = await helper.blogsInDb()
	// const idToBeUpdated = blogsAtBegin[0].id
	// const unupdatedBlog = blogsAtBegin[0]
	// const blog = { ...unupdatedBlog, likes: unupdatedBlog.likes+1 }
	// const updatedBlog = await api
	// 	.put(`/api/blogs/${idToBeUpdated}`)
	// 	.send(blog)
	// expect(updatedBlog.body.likes).toBe(unupdatedBlog.likes+1)
	const tmpBlog = 	{
		title: 'tmp blog',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	}
	const updatedTmpBlog = 	{
		title: 'tmp blog',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: tmpBlog.likes + 1,
	}
	const postResponse = await api
		.post('/api/blogs')
		.set('Authorization', `Bearer ${token}`)
		.send(tmpBlog)
	const tmpBlogId = postResponse.body.id
	const putResponse = await api
		.put(`/api/blogs/${tmpBlogId}`)
		.set('Authorization', `Bearer ${token}`)
		.send(updatedTmpBlog)
	expect(putResponse.body.likes).toBe(tmpBlog.likes+1)
}, 100000)

//after all close the mongoose connection
afterAll(() => {
	mongoose.connection.close()
})