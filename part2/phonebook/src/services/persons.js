import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data)
}

//NB: You can't use the name delete for a variable because it's a reserved word in JavaScript.
const remove = (id) => {
  const url = `${baseUrl}/${id}`
  return axios.delete(url).then((response) => {
    console.log('delete person, ', response)
  })
}

const update = (id, newObject) => {
  const url = `${baseUrl}/${id}`
  return axios.put(url, newObject).then((response) => response.data)
}

export default { getAll, create, remove, update }
