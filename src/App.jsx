import { useState } from 'react'
import './App.css'
import QuizPage from './components/QuizPage'
import StartPage from './components/StartPage'

function App() {

  const [start, setStart] = useState(true)

  function startQuiz() {
    setStart(pre => !pre)
    
  }

  return (
    <div className="App">

      {(start)
        ?
        <StartPage startFunction={startQuiz} />
        :
        <QuizPage />
      }

    </div>
  )
}

export default App
