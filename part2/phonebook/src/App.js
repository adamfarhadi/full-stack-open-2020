import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import PrintPhonebook from './components/PrintPhonebook'

const App = () =>
{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() =>
  {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>
      {
        setPersons(response.data)
      })
  }, [])

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} filterHandler={handleNewFilter} />
      <h3>Add a new person</h3>
      <AddNewPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <PrintPhonebook persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App
