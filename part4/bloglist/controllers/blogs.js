const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
	response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
	const body = request.body
	// decode the token
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	// console.log(`decodedToken: ${JSON.stringify(decodedToken)}`)
	if(!decodedToken.id){ // if(!decodedToken) ?
		response.status(401).json({ error: 'token missing or invalid' })
	}

	const userId = decodedToken.id
	const user = await User.findById(userId)

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

blogsRouter.delete('/:id', async (request, response, next) => {
	//decode the token
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	//verify that the creator and deleter of this blog is the same user
	const deletorId = decodedToken.id
	const theblog = await Blog.findById(request.params.id)
	if(theblog){
		const creatorId = theblog.user.toString()

		const sameUser = deletorId === creatorId
		//delete the blog if sameUser
		if(sameUser){
			await Blog.findByIdAndRemove(request.params.id)
			response.status(204).end()
		}else{
			response.status(401).json({ error: 'A blog can be deleted only by the user who added the blog.' })
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