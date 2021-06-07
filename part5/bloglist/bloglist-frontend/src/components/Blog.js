import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

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

  const viewHideText = () => {
    if (visible) return 'hide'
    else return 'view'
  }

  const extraInfo = () => {
    if (visible)
      return (
        <div>
          <div className='blogUrl'>url: {blog.url}</div>
          <div className='blogLikes'>likes: {blog.likes} {' '} <button onClick={() => handleLike(blog)}>like</button></div>
          <div>added by: {blog.user.name}</div>
          {isOwnedByUser ? <div><button onClick={() => handleRemove(blog)}>remove</button></div> : null}
        </div>
      )
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogTitleAndAuthor'>
        {blog.title} - {blog.author} {' '}
        <button onClick={toggleVisibility}>{viewHideText()}</button>
      </div>
      {extraInfo()}
    </div>
  )
}

export default Blog