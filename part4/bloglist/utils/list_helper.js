const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((previousTotal, current) => previousTotal + current.likes, 0)
}

module.exports = {
	dummy, totalLikes
}