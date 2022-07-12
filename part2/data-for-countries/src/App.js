import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ query, queryHandler }) => (
  <div>
    find countries
    <input value={query} onChange={queryHandler} />
  </div>
)

const ListOfCountries = ({ countries }) => {
  return (
    <div>
      {countries.map((element) => {
        console.log('element, ', element)
        return <div>{element.name.common}</div>
      })}
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

const Display = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else {
    return <ListOfCountries countries={countries} />
  }
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
      {countries.length > 0 && <Display countries={countries} />}
    </div>
  )
}

export default App
