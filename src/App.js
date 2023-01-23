import { useState, useEffect } from 'react'
import { DateGreeting } from './components/DateGreeting'
import axios from 'axios'

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
              key={dev.name}
              gitHub={dev.gitHub}
            />
          ))}
        </div>
      </main>
    </>
  )
}

function Developer({ name, expertise, gitHub }) {
  const [expanded, setExpanded] = useState(false)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${gitHub}/repos?per_page=5`)
      .then((response) => setRepos(response.data.map(obj => [obj.name, obj.html_url])))
  }, [gitHub])

  const handleClick = () => setExpanded(!expanded)

  const buttonText = expanded ? 'Less Info' : 'More Info'

  return (
    <div style={{ border: 'solid 1px silver', margin: '5px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{name}</p>
        <button className="button button-outline" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
      <div>
        {expanded && (
          <>
            <p>{expertise}</p>
            <ul>
              {repos.map(([repoName, repoURL]) => (
                <li><a href={repoURL} target="_blank" rel="noreferrer">{repoName}</a></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default App
