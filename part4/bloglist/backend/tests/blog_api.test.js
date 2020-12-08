const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('correct amount of blogs are returned in JSON format', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs/')
  response.body.map((blog) => expect(blog).toHaveProperty('id'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'How to make fried rice',
    author: 'Dr. Fried McRice',
    url: 'http://fried.rice',
    likes: '749'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsinDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blogs => blogs.title)
  expect(titles).toContain(newBlog.title)
})

test('if likes property is missing in the request, defaults to 0', async () => {
  const newBlog = {
    title: 'How to make fried rice',
    author: 'Dr. Fried McRice',
    url: 'http://fried.rice'
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsinDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blogs => blogs.title)
  expect(titles).toContain(newBlog.title)

  const returnedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
  expect(returnedBlog.likes).toEqual(0)
})

test('if title and url properties are missing, backend responds with 400 bad request', async () => {
  const newBlog = {
    author: 'Dr. Fried McRice',
    likes: 23
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})