import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') // typeof '' is undefined

  useEffect(() => {
    console.log('inital persons')
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existed = persons.find((element) => element.name === newName)
    if (
      existed &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one? `
      )
    ) {
      const personObject = { name: existed.name, number: newNumber }
      personService.update(existed.id, personObject).then((updatedPerson) => {
        const newPersons = persons.map((element) =>
          element.name !== existed.name ? element : updatedPerson
        )
        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
      })
    } else if (!existed) {
      const personObject = { name: newName, number: newNumber }

      personService.create(personObject).then((newPerson) => {
        const newPersons = persons.concat(newPerson)
        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleRemove = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        personService.remove(id)
        setPersons(persons.filter((element) => element.id !== id))
      }
    }
  }

  const personsToShow = filter
    ? persons.filter((element) =>
        element.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removeHandler={handleRemove} />
    </div>
  )
}

export default App
