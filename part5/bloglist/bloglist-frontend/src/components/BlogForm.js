import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id='title' value={newTitle} onChange={handleNewTitle} />
        </div>
        <div>
          author: <input id='author' value={newAuthor} onChange={handleNewAuthor} />
        </div>
        <div>
          url: <input id='url' value={newUrl} onChange={handleNewUrl} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm