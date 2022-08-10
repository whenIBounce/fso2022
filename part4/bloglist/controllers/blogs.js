const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
	response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
	//verify that the creator and deleter of this blog is the same user
	const user = request.user
	const theblog = await Blog.findById(request.params.id)

	if(theblog){
		const creatorId = theblog.user.toString()
		const sameUser = user.id === creatorId
		//delete the blog if sameUser
		if(sameUser){
			await Blog.findByIdAndRemove(request.params.id)
			user.blogs = user.blogs.filter((blog) => blog.toString() === theblog.id)
			await user.save()
			response.status(204).end()
		}else{
			return response.status(401).json({ error: 'A blog can be deleted only by the user who added the blog.' })
		}
	}
	next()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	console.log(`update request.body, ${body}`)
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}
	const updatedBlog = await Blog
		.findByIdAndUpdate(
			request.params.id,
			blog,
			{ new: true, runValidators: true, context: 'query' } )
	response.json(updatedBlog)
})
module.exports = blogsRouter