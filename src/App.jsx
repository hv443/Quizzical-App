import { useEffect, useState } from 'react'
import './App.css'
import QuizPage from './components/QuizPage'
import StartPage from './components/StartPage'
import { nanoid } from 'nanoid'

function App() {

  const [start, setStart] = useState(false)
  const [data, setData] = useState([])
  const [isPlaying, setIsPlaying] = useState(true)
  const [restartGame, setRestartGame] = useState(false)
  const [score, setScore] = useState(0)

  function startQuiz() {
    setStart(pre => !pre)
  }


  function newGame() {
    setRestartGame(pre => !pre)
    setScore(0)
    setIsPlaying(pre => !pre)
  }


  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(e => {
        setData(quizData(e.results))
      })
  }, [restartGame])


  function quizData(elements) {
    return elements.map((data) =>
    ({
      options: setOptions(data.incorrect_answers.concat(data.correct_answer), data.correct_answer).sort((a, b) => 0.5 - Math.random()),
      questions: data.question,
      correctOption: data.correct_answer,
      id: nanoid()
    }))
  }



  function optionClicked(clickId, questionId) {
    setData(data.map(allElements => {
      if (allElements.id === questionId) {

        const elementData = allElements.options.map(option => {
          if (option.id === clickId) {
            return ({
              ...option,
              isHeld: !option.isHeld
            })
          }
          else if (option.isHeld) {
            return ({
              ...option,
              isHeld: !option.isHeld
            })
          }
          else {
            return option
          }
        })
        return ({
          ...allElements,
          options: elementData
        })
      } else {
        return allElements
      }
    }))
  }


  function checkAnswer() {
    setIsPlaying(pre => !pre)
    setData(data.map(allElements => {
      const optionslist = allElements.options.map(option => {

        if (option.isCorrect && option.isHeld) {
          setScore(pre => pre + 1)

          return ({
            ...option,
            isCorrectAnswer: true
          })
        }
        else if (!option.isCorrect && option.isHeld) {
          return ({
            ...option,
            isIncorrectAnswer: true
          })
        }
        else if (!option.isCorrect && !option.isHeld) {
          return ({
            ...option,
            isNotSelectedIncorrect: true
          })
        }
        else if (option.isCorrect && !option.isHeld) {
          return ({
            ...option,
            isNotSelectedCorrect: true
          })
        }
        else {
          return option
        }
      })
      return ({
        ...allElements,
        options: optionslist
      })
    }))
  }

  function setOptions(allOptions, correctAnswer) {
    return allOptions.map(option => {
      return ({
        value: option,
        id: nanoid(),
        isHeld: false,
        isCorrect: option === correctAnswer ? true : false,
        isCorrectAnswer: false,
        isIncorrectAnswer: false
      })
    })
  }

  return (
    <div className="App px-10 py-5 min-w-full flex items-center justify-center min-h-screen font-[inter]">

      {!start
        ?
        <StartPage startFunction={startQuiz} />
        :
        <div>
          <QuizPage elements={data}
            selectOption={optionClicked}
            isplaying={isPlaying}
          />



          <div className='w-full place-content-center grid'>

            {!isPlaying ?
              <div className='flex items-center justify-center'>
                <div className='font-semibold text-xl text-gray-900 mr-5'>
                  <h1 className='font-semibold text-blue-900 text-sm md:text-xl'>You scored {score}/5 correct answers</h1>
                </div>

                <button onClick={newGame} className='p-3 text-sm bg-blue-700 rounded-lg font-[500] text-white md:px-5 md:font-semibold'>Play Again</button>
              </div>
              :
              <button onClick={checkAnswer} className='p-3 text-sm bg-blue-700 rounded-lg font-[500] text-white md:px-5 md:font-semibold'>Check Answer</button>
            }
          </div>
        </div>
      }

    </div>
  )
}

export default App
