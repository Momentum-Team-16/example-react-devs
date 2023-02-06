import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DevForm = ({ addNewDev, token }) => {
  const [name, setName] = useState('')
  const [expertise, setExpertise] = useState('')
  const [github, setGithub] = useState('')
  const [available, setAvailable] = useState(true)
  const navigate = useNavigate()

  const resetForm = () => {
    setName('')
    setExpertise('')
    setGithub('')
    setAvailable('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const devEndpoint = 'https://node-api-devs-for-hire.glitch.me/devs'
    axios
      .post(
        devEndpoint,
        {
          name,
          expertise,
          github,
          available,
        },
        {
          headers: { "authorization": token },
        }
      )
      .then((res) => {
        addNewDev(res.data.created)
        resetForm()
        navigate("/")
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="form">
    <h2>Add a new dev</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="expertise">Expertise</label>
        <input
          type="text"
          name="expertise"
          id="expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="github">GitHub Username</label>
        <input
          type="text"
          name="github"
          id="github"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="available">
          Available for hire
          <input
            type="checkbox"
            name="available"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default DevForm
