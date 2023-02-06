import { useState, useEffect } from 'react'
import { DateGreeting } from './components/DateGreeting'
import axios from 'axios'
import { Developer, DeveloperDetail } from './components/Developer'
import DevForm from './components/DevForm'
import orderBy from 'lodash'
import Login from './components/Login'
import useLocalStorageState from 'use-local-storage-state'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import DevList from './components/DevList'
import './App.css'

function App(props) {
  const [devs, setDevs] = useState([])
  const [token, setToken] = useLocalStorageState('devsToken', '')
  const [loggedInUser, setLoggedInUser] = useLocalStorageState(
    'devsLoggedInUser',
    ''
  )
  const location = useLocation()

  useEffect(() => {
    axios
      .get('https://node-api-devs-for-hire.glitch.me/devs')
      .then((res) => setDevs(res.data))
  }, [])

  const handleAddNewDev = (devObj) => {
    setDevs((devs) => [...devs, devObj])
  }

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>React Devs For Hire</h1>
        {token && (
          <nav className="nav">
            <Link to="/devs/new" className="btn">
              Add a new dev
            </Link>
          </nav>
        )}
      </header>
      <main>
        {location.pathname !== '/' && <Link to="/">Back to List</Link>}
        {token ? (
          <>
            <DateGreeting loggedInUser={loggedInUser} />
            <Routes>
              <Route path="/" element={<DevList devs={devs} />} />
              <Route path="/devs/:id" element={<DeveloperDetail />} />
              <Route
                path="/devs/new"
                element={<DevForm addNewDev={handleAddNewDev} token={token} />}
              />
            </Routes>
          </>
        ) : (
          <Login setLoggedInUser={setLoggedInUser} setToken={setToken} />
        )}
      </main>
    </>
  )
}

export default App
