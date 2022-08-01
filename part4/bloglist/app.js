const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')


const mongoUrl = config.MONGODB_URI
console.log(typeof(mongoUrl))
console.log('the url', mongoUrl)
mongoose
  .connect(mongoUrl)
  .then(() => console.log('connected to MONGODB succesfully'))
  .catch(err => console.log(err))

app.use(cors())
app.use('/api/blogs', blogsRouter)
app.use(express.json())

module.exports = app

