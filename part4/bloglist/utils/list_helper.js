var _ = require('lodash')
const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) return 0
	return blogs.reduce((previousTotal, current) => previousTotal + current.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return undefined
	const sortByLikes = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
	return {
		title: sortByLikes[0].title,
		author: sortByLikes[0].author,
		likes: sortByLikes[0].likes
	}
}

const mostBlogs = (bloglist) => {
	var result = _.chain(bloglist)
		.groupBy('author')
		.map((value, key) => ({ author: key, blogs: value.length }))
		.reduce((max, item) => {
			return max.blogs > item.blogs ? max : item
		})
		.value()
	return result
}

const mostLikes = (bloglist) => {
	var result = _.chain(bloglist)
		.groupBy('author')
		.map(
			(value, key) => {
				var numOfLikes = value.reduce((total, item) => total+item.likes, 0)
				return { author: key, likes: numOfLikes }
			}
		)
		.reduce((max, item) => {
			return max.likes > item.likes ? max : item
		})
		.value()
	return result
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}