import { useState, useEffect } from 'react'
import { DateGreeting } from './components/DateGreeting'
import axios from 'axios'
import { Developer, DeveloperDetail } from './components/Developer'
import DevForm from './components/DevForm'
import orderBy from 'lodash'
import Login from './components/Login'
import useLocalStorageState from 'use-local-storage-state'
import { Route, Routes } from 'react-router-dom'
import DevList from './components/DevList'

function App(props) {
  const [devs, setDevs] = useState([])
  const [selectedDev, setSelectedDev] = useState('')
  const [token, setToken] = useLocalStorageState("devsToken", "")
  const [loggedInUser, setLoggedInUser] = useLocalStorageState('devsLoggedInUser', "")

  useEffect(() => {
    axios
      .get('https://node-api-devs-for-hire.glitch.me/devs')
      .then((res) => setDevs(res.data))
  }, [])

  // if (!token){
  //   return <Login setLoggedInUser={setLoggedInUser} setToken={setToken} />
  // }

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
    setDevs((devs) => [...devs, devObj])
  }

  return (
    <>
      <header>
        <h1>React Devs For Hire</h1>
      </header>
      <main>
        <DateGreeting  loggedInUser={loggedInUser} />
        <Routes>
          <Route path="/" element={<DevList devs={devs} />}/>
          <Route path="/devs/:id" element={<DeveloperDetail />}/>
        </Routes>

      </main>
      <div className="form">
        <h2>Add a new dev</h2>
        <DevForm addNewDev={handleAddNewDev} token={token} />
      </div>
    </>
  )
}

export default App
