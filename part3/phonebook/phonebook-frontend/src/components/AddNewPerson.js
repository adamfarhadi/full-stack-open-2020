import React from 'react'

const AddNewPerson = ({ addPerson, newName, newNumber, handleNewPerson, handleNewNumber }) => 
{
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewPerson} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddNewPerson