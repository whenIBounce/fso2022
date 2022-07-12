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

const Country = ({ country }) => {
  const languages = Object.keys(country.languages).map(
    (e) => `${country.languages[e]}`
  )
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
