import { Developer } from './Developer'

const DevList = ({devs}) => {
  return (
    <div className="dev-list">
          {devs.map((dev) => (
            <Developer
              name={dev.name}
              expertise={dev.expertise}
              key={dev.id}
              devId={dev.id}
              gitHub={dev.gitHub}
            />
          ))}
        </div>
  )
}

export default DevList
