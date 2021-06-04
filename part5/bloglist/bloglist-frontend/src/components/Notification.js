import React from 'react'
import '../index.css'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  if (type === null) {
    return null
  }

  if (type === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else if (type === 'notification') {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
}

export default Notification