import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('') // typeof '' is undefined
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('inital persons')
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons([...initialPersons, { name: 'blah', number: '11', id: 999 }])
      })
      .catch((error) => {
        console.log(error.message)
        setErrorMessage({ type: 'alert', content: error.message })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      personService
        .update(existed.id, personObject)
        .then((updatedPerson) => {
          const newPersons = persons.map((element) =>
            element.name !== existed.name ? element : updatedPerson
          )
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setErrorMessage({
            type: 'info',
            content: `${updatedPerson.name} updated successfully`,
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error.message)
          setErrorMessage({
            type: 'alert',
            content: `${existed.name} has already been removed from server`,
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else if (!existed) {
      const personObject = { name: newName, number: newNumber }

      personService
        .create(personObject)
        .then((newPerson) => {
          const newPersons = persons.concat(newPerson)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setErrorMessage({
            type: 'info',
            content: `${newPerson.name} added successfully`,
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error.message)
          setErrorMessage({ type: 'alert', content: error.message })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleRemove = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        personService
          .remove(id)
          .then((response) => {
            setPersons(persons.filter((element) => element.id !== id))
            setErrorMessage({
              type: 'info',
              content: `${name} deleted successfully`,
            })
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch((error) => {
            console.log('here in catch', error.message)
            setErrorMessage({
              type: 'alert',
              content: `${name} has already been removed from server`,
            })
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
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
      <Notification errorMessage={errorMessage} />
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
