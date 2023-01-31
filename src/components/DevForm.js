import { useState } from 'react'
import axios from 'axios'

const DevForm = ({ addNewDev }) => {
  const [name, setName] = useState('')
  const [expertise, setExpertise] = useState('')
  const [github, setGithub] = useState('')
  const [available, setAvailable] = useState(true)

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
          headers: { admin_key: process.env.REACT_APP_ADMIN_KEY },
        }
      )
      .then((res) => {
        addNewDev(res.data.created)
        resetForm()
      })
      .catch((e) => console.log(e))
  }

  return (
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
  )
}

export default DevForm
