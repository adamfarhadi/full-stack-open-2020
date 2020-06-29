import React, { useState } from 'react';

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) =>
  {
    event.preventDefault()
    if (newName === "" || newNumber === "") return

    if (persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNewPerson = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) =>
  {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) =>
  {
    setNewFilter(event.target.value)
  }

  const printNumbers = () =>
  {
    let filteredPersons = persons.filter((person) => 
      person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
    )

    return (
      <ul>
        {filteredPersons.map(person =>
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleNewFilter} />
      </div>
      <h2>Add a new person</h2>
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
      <h2>Numbers</h2>
      {printNumbers()}
    </div>
  )
}

export default App;
