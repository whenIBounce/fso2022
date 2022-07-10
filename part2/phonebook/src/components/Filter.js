const Filter = ({ filter, filterHandler }) => (
  <div>
    filter shown with <input value={filter} onChange={filterHandler} />
  </div>
)

export default Filter
