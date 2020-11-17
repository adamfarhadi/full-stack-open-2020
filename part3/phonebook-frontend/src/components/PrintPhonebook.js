import React from 'react'
import personService from '../services/persons'

const PrintPhonebook = ({ persons, newFilter, setPersons }) => {
  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1
  )

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <ul>
      {filteredPersons.map(person =>
        <li key={person.name}>
          {person.name} {person.number}
          {" "}
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default PrintPhonebook