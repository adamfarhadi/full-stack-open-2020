import React from 'react'

const PrintPhonebook = ({ persons, newFilter }) => 
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

export default PrintPhonebook