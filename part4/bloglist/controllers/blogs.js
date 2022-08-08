const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response, next) => {
	// Blog
	// 	.find({})
	// 	.then(blogs => {
	// 		response.json(blogs)
	// 	})
	// 	.catch(error => next(error))
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
	const blog = new Blog(request.body)
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
	// blog
	// 	.save()
	// 	.then(result => {
	// 		response.status(201).json(result)
	// 	})
	// 	.catch(error => next(error))
})

module.exports = blogsRouter