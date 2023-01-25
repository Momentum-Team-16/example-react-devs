import { useState, useEffect } from 'react'
import { DateGreeting } from './components/DateGreeting'
import axios from 'axios'
import { Questions } from "./components/Trivia";

function App(props) {
  // I don't _really_ need this to be in state, since as is these values don't change.
  // State is for information that changes.
  // But if they were going to change, which they definitely would in a real application,
  // I'd want this info to be in state.
  const [devs, setDevs] = useState([
    { name: 'Daniel', expertise: 'JS, Beats', gitHub: 'villeryd' },
    { name: 'Cameron', expertise: 'JS, Soccer', gitHub: 'cameronpoulton' },
    { name: 'Lucian', expertise: 'JS, Corny Memes', gitHub: 'BitGitMart' },
    { name: 'Marcus', expertise: 'JS, Comic Books', gitHub: 'marcusvno' },
    {
      name: 'Capel',
      expertise: 'JS, All Things Audio',
      gitHub: 'capelhoworth',
    },
  ])
  const [selectedDev, setSelectedDev] = useState("")

  if (selectedDev) {
    const dev = devs.filter(dev => dev.name === selectedDev)[0]
    return <DeveloperDetail name={dev.name} setSelectedDev={setSelectedDev} gitHub={dev.gitHub} expertise={dev.expertise}/>
  }


  // I'm hard coding this here but this value could come from anywhere.
  // In your app, you'd want to know what category the user selected,
  // so you would want to have it in state somewhere
  const categoryId = 10

  return (
    <>
      <header>
        <h1>React Devs For Hire</h1>
      </header>
      <main>
        <Questions categoryId={categoryId}/>
      </main>
    </>
  )
}

function Developer({ name, selectDev }) {
  return (
    <div style={{ border: 'solid 1px silver', margin: '5px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{name}</p>
        <button className="button button-outline" onClick={() => selectDev(name)}>
          Select This Dev
        </button>
      </div>

    </div>
  )
}

function DeveloperDetail({name, expertise, gitHub, setSelectedDev}) {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${gitHub}/repos?per_page=5`)
      .then((response) => setRepos(response.data.map(obj => [obj.name, obj.html_url])))
  }, [gitHub])

  return (
    <>
      <button onClick={() => setSelectedDev("")}>Back to List</button>
      <h1>Details about {name}</h1>
      <div>
          <>
            <p>{expertise}</p>
            <ul>
              {repos.map(([repoName, repoURL]) => (
                <li key={repoURL}><a href={repoURL} target="_blank" rel="noreferrer">{repoName}</a></li>
              ))}
            </ul>
          </>
      </div>
    </>
  )
}

export default App
