import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ query, queryHandler }) => (
  <div>
    find countries
    <input value={query} onChange={queryHandler} />
  </div>
)

const ListOfCountries = ({ countries }) => {
  const [showSingleCountry, setShowSingleCountry] = useState(false)
  const [countryToShow, setCountryToShow] = useState('')

  const handleToggole = (country) => {
    return () => {
      console.log('country to show: ', country.name.common)
      setShowSingleCountry(!showSingleCountry)
      setCountryToShow(country)
    }
  }

  return (
    <div>
      {!showSingleCountry && (
        <div>
          {countries.map((element, index) => (
            <div key={index}>
              {element.name.common}{' '}
              <button onClick={handleToggole(element)}>show</button>
            </div>
          ))}
        </div>
      )}
      {showSingleCountry && <Country country={countryToShow} />}
    </div>
  )
}

const Weather = ({ temperature, weather_icon, wind }) => {
  return (
    <div>
      <div>temperature {temperature} Celcius</div>
      <img src={weather_icon} alt={'weather icon'} />
      <div>wind {wind} m/s </div>
    </div>
  )
}

const Country = ({ country }) => {
  const capital_latlng = country.capitalInfo.latlng
  const api_key = process.env.REACT_APP_API_KEY
  const weather_request = `https://api.openweathermap.org/data/2.5/weather?lat=${capital_latlng[0]}&lon=${capital_latlng[1]}&units=metric&appid=${api_key}`

  const languages = Object.keys(country.languages).map(
    (e) => `${country.languages[e]}`
  )

  const [weather, setWeather] = useState({
    temperature: '',
    weather_icon: '',
    wind: '',
  })

  useEffect(() => {
    axios.get(weather_request).then((response) => {
      console.log(response.data.weather.icon)
      const newWeatherObject = {
        temperature: response.data.main.temp,
        weather_icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        wind: response.data.wind.seed,
      }
      setWeather(newWeatherObject)
    })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]} </div>
      <div>area {country.area} </div>
      <br></br>
      <h3>languages: </h3>
      <ul>
        {languages.map((e, index) => (
          <li key={index}>{e}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />

      <h2>Weather in country {country.capital[0]}</h2>
      <Weather
        temperature={weather.temperature}
        weather_icon={weather.weather_icon}
        wind={weather.wind}
      />
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    if (query) {
      console.log('search: ', `https://restcountries.com/v3.1/name/${query}`)
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })
    }
  }, [query])

  return (
    <div>
      <Search query={query} queryHandler={handleQueryChange} />
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countries.length > 1 && countries.length <= 10 && (
        <ListOfCountries countries={countries} />
      )}
      {countries.length === 1 && <Country country={countries[0]} />}
    </div>
  )
}

export default App
