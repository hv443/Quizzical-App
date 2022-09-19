import { useEffect, useRef, useState } from 'react'
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
  const [isPlaying, setIsPlaying] = useState(true)
  const [restartGame, setRestartGame] = useState(false)
  const [isForm, setIsForm] = useState(true)
  const [score, setScore] = useState(0)
  const [isAllAnswerSelected, setIsAllAnswerSelected] = useState(true)
  const [API_URL, setAPI_URL] = useState("https://opentdb.com/api.php?amount=10")
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // To stop first Render
  const firstRender = useRef(false)

  function startQuiz() {
    setStart(pre => !pre)
  }

  function createQuiz(URL) {
    setAPI_URL(URL)
    setIsForm(pre => !pre)
  }

  function newGame() {
    setRestartGame(pre => !pre)
    setIsPlaying(true)
    setLoading(pre => !pre)
    setScore(0)
    setData(false)
    setIsAllAnswerSelected(true)
  }

  function backFunction() {
    setIsForm(pre => !pre)
    setIsPlaying(true)
    setIsAllAnswerSelected(true)
  }

  function allAnswerSelected() {
    if (data.length != count) {
      setIsAllAnswerSelected(false)
    } else {
      setIsAllAnswerSelected(true)
    }
  }

  useEffect(() => {
    if (firstRender.current) {
      fetch(API_URL)
        .then(res => res.json())
        .then(e => {
          setData(quizData(e.results))
          setLoading(pre => !pre)
          setCount(0)
        })
    } else {
      firstRender.current = true
    }
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


  function optionClicked(clickId, questionId) {
    setData(data.map(allQuiz => {
      if (allQuiz.id === questionId) {
        const elementData = allQuiz.options.map(option => {

          if (!option.isHeld && option.id === clickId) {
            setCount(pre => pre + 1)
          }
          else if (option.isHeld) {
            setCount(pre => pre - 1)
          }

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
          ...allQuiz,
          options: elementData
        })
      } else {
        return allQuiz
      }
    }))
  }

  function checkAnswer() {

    setIsPlaying(pre => !pre)

    setData(data.map(allQuiz => {

      const optionslist = allQuiz.options.map(option => {

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
        ...allQuiz,
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

                  <div className='min-h-screen min-w-full p-1 flex items-center justify-center flex-col space-y-2'>

                    <div className='w-[95%] md:max-w-4xl'>
                      <button onClick={backFunction} className='py-2 px-3 shadow-[#293264] shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                        md:px-5 md:py-3 md:font-semibold hover:scale-95 duration-100'>Back</button>
                    </div>


                    <QuizPage elements={data}
                      selectOption={optionClicked}
                      isplaying={isPlaying}
                    />

                    {
                      !isPlaying && count === data.length ?

                        <div className='flex items-center justify-center py-5 flex-col md:flex-row'>
                          <div className='font-semibold text-xl text-gray-900 mr-5'>

                            <h1 className='font-semibold text-blue-900 text-sm mb-3 md:mb-0 md:text-xl'>You scored {score}/{data.length} correct answers</h1>

                          </div>
                          <button onClick={newGame} className='py-3 px-4 shadow-[#293264] shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                               md:p-4 md:px-5 md:font-semibold hover:scale-95 duration-100'>Play Again</button>
                        </div>
                        : !isAllAnswerSelected ?

                          <div className='py-5 flex flex-col md:flex-row items-center justify-start md:space-x-5'>
                            {!(data.length === count) &&
                              <h1 className='font-semibold text-blue-900 text-sm mb-3 md:mb-0 md:text-xl'>Please Attend All Questions</h1>
                            }
                            <button onClick={data.length === count ? checkAnswer : allAnswerSelected} className='py-3 px-4  shadow-[#293264] shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                             md:py-4 md:px-5 md:font-semibold hover:scale-95 duration-100'>Check Answer</button>
                          </div>
                          :
                          <div className='py-5'>
                            <button onClick={count === data.length ? checkAnswer : allAnswerSelected} className='py-3 px-4  shadow-[#293264] shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                              md:py-4 md:px-5 md:font-semibold hover:scale-95 duration-100'>Check Answer</button>
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
