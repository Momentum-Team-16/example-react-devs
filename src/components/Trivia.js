import { useEffect, useState } from "react"
import axios from "axios"

export function Questions({ categoryId }) {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
      .then((response) => setQuestions(response.data.results)) // not necessarily how I would want to do this
  }, [categoryId])

  return (
    <>
      <div>
            <ul>
              {questions.map((questionObj) => (
                <li>{questionObj.question}
                  {/* Not how I would ultimately do this, but it initially gets some data on the page */}
                  <p>
                    {questionObj.correct_answer}
                  </p>
                  <p>{questionObj.incorrect_answers[0]}</p>
                </li>
              ))}
            </ul>
      </div>
    </>
  )
}
