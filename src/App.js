import { useState, useEffect } from 'react'
import { DateGreeting } from './components/DateGreeting'
import axios from 'axios'
import { Developer, DeveloperDetail } from './components/Developer'
import DevForm from './components/DevForm'
import orderBy from 'lodash'

function App(props) {
  const [devs, setDevs] = useState([])
  const [selectedDev, setSelectedDev] = useState('')
  useEffect(() => {
    axios
      .get('https://node-api-devs-for-hire.glitch.me/devs')
      .then((res) => setDevs(res.data))
  }, [])

  if (selectedDev) {
    const dev = devs.filter((dev) => dev.name === selectedDev)[0]
    return (
      <DeveloperDetail
        name={dev.name}
        setSelectedDev={setSelectedDev}
        gitHub={dev.gitHub}
        expertise={dev.expertise}
      />
    )
  }

  const handleAddNewDev = (devObj) => {
    setDevs(orderBy([devObj, ...devs], ['id']))
  }

  return (
    <>
      <header>
        <h1>React Devs For Hire</h1>
      </header>
      <main>
        <DateGreeting />
        <div className="dev-list">
          {devs.map((dev) => (
            <Developer
              name={dev.name}
              expertise={dev.expertise}
              key={dev.id}
              gitHub={dev.gitHub}
              selectDev={setSelectedDev}
            />
          ))}
        </div>
      </main>
      <div className="form">
        <h2>Add a new dev</h2>
        <DevForm addNewDev={handleAddNewDev} />
      </div>
    </>
  )
}

export default App
