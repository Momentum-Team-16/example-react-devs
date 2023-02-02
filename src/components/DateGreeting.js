import dayjs from 'dayjs'

export const DateGreeting = ({loggedInUser}) => {
  return (
    <div className="greeting">
      <span>Hello, {loggedInUser}. Today is </span>
      <span style={{ color: 'teal', fontWeight: '600' }}>
        {dayjs().format('dddd, MMMM D, YYYY')}
      </span>
    </div>
  )
}
