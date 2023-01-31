import { useState, useEffect } from 'react'
import { DateGreeting } from './components/DateGreeting'
import axios from 'axios'
import DevForm from './components/DevForm'
import orderBy from "lodash"

function App(props) {
  const [devs, setDevs] = useState([])
  const [selectedDev, setSelectedDev] = useState('')
  useEffect(() => {
    axios.get('https://node-api-devs-for-hire.glitch.me/devs').then(res => setDevs(res.data))
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

function Developer({ name, selectDev }) {
  return (
    <div style={{ border: 'solid 1px silver', margin: '5px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{name}</p>
        <button
          className="button button-outline"
          onClick={() => selectDev(name)}
        >
          Select This Dev
        </button>
      </div>
    </div>
  )
}

function DeveloperDetail({ name, expertise, gitHub, setSelectedDev }) {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${gitHub}/repos?per_page=5`)
      .then((response) =>
        setRepos(response.data.map((obj) => [obj.name, obj.html_url]))
      )
  }, [gitHub])

  return (
    <>
      <button onClick={() => setSelectedDev('')}>Back to List</button>
      <h1>Details about {name}</h1>
      <div>
        <>
          <p>{expertise}</p>
          <ul>
            {repos.map(([repoName, repoURL]) => (
              <li key={repoURL}>
                <a href={repoURL} target="_blank" rel="noreferrer">
                  {repoName}
                </a>
              </li>
            ))}
          </ul>
        </>
      </div>
    </>
  )
}

export default App
