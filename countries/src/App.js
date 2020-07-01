import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import PrintCountries from './components/PrintCountries'

function App()
{
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() =>
  {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>
      {
        setCountries(response.data)
      })
  }, [])

  const handleNewFilter = (event) =>
  {
    setFilter(event.target.value)
  }

  const handleButtonClick = (country) =>
  {
    setFilter(country)
  }

  return (
    <div>
      <Filter filter={filter} filterHandler={handleNewFilter} />
      <PrintCountries countries={countries} filter={filter} clickHandler={handleButtonClick}/>
    </div>
  )
}

export default App;
