import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title} - {blog.author} {' '}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} - {blog.author} {' '}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes} {' '} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>added by: {blog.user.name}</div>
        {isOwnedByUser ? <div><button onClick={() => handleRemove(blog)}>remove</button></div> : null}
      </div>
    </div>
  )
}

export default Blog