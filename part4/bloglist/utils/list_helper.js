const nodemon = require("nodemon");

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

module.exports = {
	dummy, totalLikes, favoriteBlog
}