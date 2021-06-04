import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, refreshBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const isOwnedByUser = user.username === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

    try {
      await blogService.update(blog.id, updatedBlog)
      refreshBlogs()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    try {
      await blogService.remove(blog.id)
      refreshBlogs()
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title} - {blog.author} {" "}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} - {blog.author} {" "}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes} {" "} <button onClick={handleLike}>like</button></div>
        <div>added by: {blog.user.name}</div>
        {isOwnedByUser ? <div><button onClick={handleDelete}>remove</button></div> : null}
      </div>
    </div>
  )
}

export default Blog