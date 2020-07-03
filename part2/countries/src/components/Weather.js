import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current'
        + `?access_key=${api_key}`
        + `&query=${city}`
      )
      .then(response => { setWeather(response.data) })
  }, [api_key, city])

  if (Object.keys(weather).length === 0) {
    return null
  }
  else {
    return (
      <div>
        <h3>Weather in {city}</h3>
        <ul>
          <li><b>Temperature: </b> {weather.current.temperature} &deg;C</li>
          <li><b>Wind: </b> {weather.current.wind_speed} km/h {weather.current.wind_dir}</li>
        </ul>
        <img src={weather.current.weather_icons} alt="weather icon"/>
      </div>
    )
  }

}

export default Weather