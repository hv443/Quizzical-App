import { useEffect, useState } from 'react'
import './App.css'
import QuizPage from './components/QuizPage'
import StartPage from './components/StartPage'
import { nanoid } from 'nanoid'
import LoadingScreen from './components/LoadingScreen'
import topBg from "../assets/blob T.png"
import bottomBg from "../assets/blob B.png"
import QuizForm from './components/QuizForm'


function App() {

  const [start, setStart] = useState(true)
  const [data, setData] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [restartGame, setRestartGame] = useState(false)
  const [isForm, setIsForm] = useState(true)
  const [score, setScore] = useState(0)
  const [API_URL, setAPI_URL] = useState('falsecsd')
  // const [count, setCount] = useState(0)

  // To stop first Render

  const [loading, setLoading] = useState(true)

  function startQuiz() {
    setStart(pre => !pre)
  }

  function createQuiz(URL) {
    setAPI_URL(URL)
    setIsForm(pre => !pre)
  }

  function newGame() {
    setRestartGame(pre => !pre)
    setIsPlaying(pre => !pre)
    setLoading(pre => !pre)
    setScore(0)
    setData(false)
  }

  function back() {
    setIsForm(pre => !pre)
  }

  useEffect(() => {

    fetch(API_URL)
      .then(res => res.json())
      .then(e => {
        setData(quizData(e.results))
        setLoading(pre => !pre)
      })

  }, [restartGame, isForm])


  function quizData(elements) {
    return elements.map((data) =>
    ({
      options: setOptions(data.incorrect_answers.concat(data.correct_answer), data.correct_answer).sort(() => 0.5 - Math.random()),
      questions: data.question,
      correctOption: data.correct_answer,
      id: nanoid()
    }))
  }

  // function selectAllOptions(questionId) {
  //   data.map(allElements => {
  //     if (questionId === allElements.id) {
  //       allElements.options.map(option => {
  //         if (option.isHeld) {
  //           setCount(pre => pre + 1)
  //         }
  //       })
  //     }
  //   })
  // }

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
    <div className="font-[inter] min-h-screen relative z-0">

      <img src={topBg} alt="bgimg" className='-z-10 absolute right-0 top-0 w-[30%] md:w-[25%]' />
      <img src={bottomBg} alt="bgimg" className='-z-10 absolute left-0 bottom-0 w-[30%] md:w-[25%]' />

      {
        start
          ?
          <StartPage startFunction={startQuiz} />
          :
          isForm
            ?
            <QuizForm createQuiz={createQuiz} backBtn={startQuiz} />
            :

            <div>

              {
                loading ?
                  <LoadingScreen />
                  :

                  <div className='min-h-screen min-w-full p-2 flex items-center justify-center flex-col space-y-2'>


                    <div className='w-[95%] md:max-w-4xl'>
                      <button onClick={back} className='py-2 px-3 mb-5 shadow-[#293264] shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                        md:px-5 md:py-3 md:font-semibold hover:scale-95 duration-100'>Back</button>
                    </div>


                    <QuizPage elements={data}
                      selectOption={optionClicked}
                      isplaying={isPlaying}
                    />

                    {
                      isPlaying ?

                        <div className='flex items-center justify-center flex-col space-y-2 md:flex-row'>
                          <div className='font-semibold text-xl text-gray-900 mr-5'>

                            <h1 className='font-semibold text-blue-900 text-sm md:text-xl'>You scored {score}/{data.length} correct answers</h1>

                          </div>
                          <button onClick={newGame} className='py-3 px-4 shadow-[#293264] shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                           md:p-4 md:px-5 md:font-semibold hover:scale-95 duration-100'>Play Again</button>
                        </div>
                        :
                        <div>

                          <button onClick={checkAnswer} className='py-3 px-4 shadow-[#293264] shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                          md:p-4 md:px-5 md:font-semibold hover:scale-95 duration-100'>Check Answer</button>

                        </div>
                    }


                  </div>

              }



            </div>

      }
    </div >

  )
}

export default App
