const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    if (body.likes === undefined)
      body.likes = 0

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({ ...body, user: user._id })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== decodedToken.id) {
      response.status(401).json({ error: 'user does not have permission to delete this blog' })
    }

    await blog.remove()
    return response.status(204).end()

  } catch (error) {
    return next(error)
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = { ...body }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter