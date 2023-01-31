import { useEffect, useState } from 'react'
import axios from 'axios'
export function Developer({ name, selectDev }) {
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

export function DeveloperDetail({ name, expertise, gitHub, setSelectedDev }) {
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
