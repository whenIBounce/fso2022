const Persons = ({ persons, removeHandler }) => (
  <div>
    {persons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number} {` `}
        <button onClick={removeHandler(person.id, person.name)}>delete</button>
      </div>
    ))}
  </div>
)

export default Persons
