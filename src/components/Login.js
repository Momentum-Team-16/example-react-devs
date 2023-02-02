import { useState } from 'react'
import axios from 'axios'
import Error from './Error'
const Login = ({setLoggedInUser, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:8000/api/auth/token/login', {
      username,
      password
    }).then(res => {
      setLoggedInUser(username)
      setToken(res.data.auth_token)
    }).catch((e) => setError(e))
  }


  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} onFocus={() =>  setError(null)}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      { error && <Error message={error.message} />}
    </>
  )
}

export default Login
