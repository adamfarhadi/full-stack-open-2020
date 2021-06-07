import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog
  let user
  let mockHandleLikes
  let mockHandleRemoves
  beforeEach(() => {
    blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 8,
      user: {
        name: 'Test McTester',
        username: 'McTester'
      }
    }

    user = {
      name: 'Test McTester',
      username: 'McTester'
    }

    mockHandleLikes = jest.fn()
    mockHandleRemoves = jest.fn()

    component = render(
      <Blog blog={blog} user={user} handleLike={mockHandleLikes} handleRemove={mockHandleRemoves} />
    )
  })

  test('url and likes not shown by default', () => {
    const titleAndAuthor = component.container.querySelector('.blogTitleAndAuthor')
    expect(titleAndAuthor).toHaveTextContent(`${blog.title} - ${blog.author}`)

    const url = component.container.querySelector('.blogUrl')
    expect(url).toBeNull()

    const likes = component.container.querySelector('.blogLikes')
    expect(likes).toBeNull()
  })

  test('Url and likes shown when "view" button pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const titleAndAuthor = component.container.querySelector('.blogTitleAndAuthor')
    expect(titleAndAuthor).toHaveTextContent(`${blog.title} - ${blog.author}`)

    const url = component.container.querySelector('.blogUrl')
    expect(url).toHaveTextContent('testUrl')

    const likes = component.container.querySelector('.blogLikes')
    expect(likes).toHaveTextContent(8)
  })

  test('if like button clicked twice, event handler is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandleLikes.mock.calls).toHaveLength(2)
  })
})