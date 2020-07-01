import React from 'react'

const PrintCountries = ({ countries, filter, clickHandler }) => 
{
  let filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  )

  if (filteredCountries.length < 1)
  {
    return "No matches"
  }
  else if (filteredCountries.length === 1)
  {
    let country = filteredCountries[0]
    return (
      <>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(language =>
            <li key={language.iso639_2}>
              {language.name}
            </li>
          )}
        </ul>
        <img src={country.flag} alt={`flag of ${country.name}`} width="150" />
      </>
    )
  }
  else if (filteredCountries.length > 10)
  {
    return "Too many matches, specify another filter"
  }
  else
  {
    return (
      filteredCountries.map(country =>
        <div key={country.alpha3Code}>
          <p>{country.name} {" "}
            <button onClick={() => clickHandler(country.name)}>show</button>
          </p>
        </div>
      )
    )
  }
}

export default PrintCountries