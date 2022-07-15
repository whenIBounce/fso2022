const Notification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  const style = {
    color: errorMessage.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{errorMessage.content}</div>
}

export default Notification
