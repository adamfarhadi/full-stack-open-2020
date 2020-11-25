import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import AddNewPerson from './components/AddNewPerson'
import PrintPhonebook from './components/PrintPhonebook'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === "") {
      setNotification({ ...notification, message: `Error: name field cannot be empty`, type: "error" })
      setTimeout(() => {
        setNotification({ ...notification, message: null, type: null })
      }, 5000)

      return
    }

    if (newNumber === "") {
      setNotification({ ...notification, message: `Error: number field cannot be empty`, type: "error" })
      setTimeout(() => {
        setNotification({ ...notification, message: null, type: null })
      }, 5000)

      return
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToChange = persons.find(p => p.name === newName)
        const changedPerson = { ...personToChange, number: newNumber }

        personService
          .update(personToChange.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNotification({ ...notification, message: `Updated ${returnedPerson.name}`, type: "notification" })
            setTimeout(() => {
              setNotification({ ...notification, message: null, type: null })
            }, 5000)
          })
          .catch(error => {
            setNotification({ ...notification, message: error.response.data.error, type: "error" })
            setTimeout(() => {
              setNotification({ ...notification, message: null, type: null })
            }, 5000)
            // setPersons(persons.filter(p => p.id !== personToChange.id))
          })
      }

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setNotification({ ...notification, message: `Added ${returnedPerson.name}`, type: "notification" })
        setTimeout(() => {
          setNotification({ ...notification, message: null, type: null })
        }, 5000)
      })
      .catch(error => {
        setNotification({ ...notification, message: error.response.data.error, type: "error" })
        setTimeout(() => {
          setNotification({ ...notification, message: null, type: null })
        }, 5000)
      })
  }

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <PrintPhonebook
        persons={persons}
        newFilter={newFilter}
        setPersons={setPersons} />
    </div>
  )
}

export default App
