import { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'

export function Developer({ name, devId }) {
  return (
    <div style={{ border: 'solid 1px silver', margin: '5px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to={`devs/${devId}`}>{name}</Link>
      </div>
    </div>
  )
}

export function DeveloperDetail() {
  const [repos, setRepos] = useState([])
  const [dev, setDev] = useState({})
  const {id} = useParams()

  useEffect(() => {
    axios.get(`https://node-api-devs-for-hire.glitch.me/devs/${id}`)
      .then(res => setDev(res.data))
  }, [id])
  // useEffect(() => {
  //   axios
  //     .get(`https://api.github.com/users/${gitHub}/repos?per_page=5`)
  //     .then((response) =>
  //       setRepos(response.data.map((obj) => [obj.name, obj.html_url]))
  //     )
  // }, [gitHub])

  return (
    <>
    <Link to="/">Back to List</Link>
      <h1>Details about {dev.name}</h1>
      <div>
        <>
          <p>{dev.expertise}</p>
          <ul>
            {/* {repos.map(([repoName, repoURL]) => (
              <li key={repoURL}>
                <a href={repoURL} target="_blank" rel="noreferrer">
                  {repoName}
                </a>
              </li>
            ))} */}
          </ul>
        </>
      </div>
    </>
  )
}
