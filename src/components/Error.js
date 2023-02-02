const Error = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: '#f4acb7',
        padding: '10px',
        borderRadius: '5px',
      }}
    >
      <p>{message}</p>
    </div>
  )
}

export default Error
