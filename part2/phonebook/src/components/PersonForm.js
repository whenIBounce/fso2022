const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  nameHandler,
  numberHandler,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={nameHandler} />
    </div>

    <div>
      number: <input value={newNumber} onChange={numberHandler} />
    </div>

    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

export default PersonForm
