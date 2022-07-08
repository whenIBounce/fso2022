import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td> {text}</td>
    <td> {value} </td>
  </tr>
)
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <div> No feedback given</div>
      </div>
    )
  }
  const getTotal = () => good + neutral + bad

  const getAverage = () => (1 * good + -1 * bad) / getTotal()

  const getPositive = () => good / getTotal()

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={bad + good + neutral} />
          <StatisticLine text='average' value={getAverage()} />
          <StatisticLine text='positive' value={getPositive()} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
