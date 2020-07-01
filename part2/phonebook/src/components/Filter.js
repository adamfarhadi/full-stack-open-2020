import React from 'react'

const Filter = ({ filter, filterHandler }) => 
{
  return (
    <div>
      filter shown with <input value={filter} onChange={filterHandler} />
    </div>
  )
}

export default Filter