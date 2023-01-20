import { useState } from 'react'
import { DateGreeting } from './components/DateGreeting'

function App(props) {
  // I don't _really_ need this to be in state, since as is these values don't change.
  // State is for information that changes.
  // But if they were going to change, which they definitely would in a real application,
  // I'd want this info to be in state.
  const [devs, setDevs] = useState([
    { name: 'Daniel', expertise: 'JS, Beats' },
    { name: 'Cameron', expertise: 'JS, Soccer' },
    { name: 'Lucian', expertise: 'JS, Corny Memes' },
    { name: 'Marcus', expertise: 'JS, Comic Books' },
  ])

  return (
      <>
      <header>
        <h1>React Devs For Hire</h1>
      </header>
      <main>
      <DateGreeting />
      <div className="dev-list">
        {devs.map((dev) => (
          <Developer name={dev.name} expertise={dev.expertise} key={dev.name} />
        ))}
      </div>
      </main>
      </>
  )
}

function Developer({ name, expertise }) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => setExpanded(!expanded)

  return (
    <div style={{ border: 'solid 1px silver', margin: '5px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{name}</p>
        <button className="button button-outline" onClick={handleClick}>
          More Info
        </button>
      </div>
      <div>{expanded && <p>{expertise}</p>}</div>
    </div>
  )
}

export default App
