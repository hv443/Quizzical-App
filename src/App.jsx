import { useEffect, useState } from 'react'
import './App.css'
import QuizPage from './components/QuizPage'
import StartPage from './components/StartPage'

function App() {

  const [start, setStart] = useState(true)
  const [data, setData] = useState([])


  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(e => {
        setData(e.results)
      })

  }, [0])

  function startQuiz() {
    setStart(pre => !pre)

  }

  return (
    <div className="App">

      {(start)
        ?
        <StartPage startFunction={startQuiz} />
        :
        <QuizPage elements={data} />
      }

    </div>
  )
}

export default App
