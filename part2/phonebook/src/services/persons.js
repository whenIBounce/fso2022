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
  axios.delete(url).then((response) => {
    console.log('delete person')
  })
}

export default { getAll, create, remove }
