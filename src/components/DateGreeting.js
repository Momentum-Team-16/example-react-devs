import dayjs from 'dayjs'

export const DateGreeting = () => {
  return (
    <div className="greeting">
      <span>Hello, today is </span>
      <span style={{ color: 'teal', fontWeight: '600' }}>
        {dayjs().format('dddd, MMMM D, YYYY')}
      </span>
    </div>
  )
}
