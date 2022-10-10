import { useEffect, useRef, useState } from "react";
import QuizPage from "./components/QuizPage";
import StartPage from "./components/StartPage";
import { nanoid } from "nanoid";
import LoadingScreen from "./assests/LoadingScreen";
import topBg from "../assets/blob T.png";
import bottomBg from "../assets/blob B.png";
import QuizForm from "./components/QuizForm";
import DarkMode from "./assests/DarkMode";

function App() {
  const [start, setStart] = useState(true);
  const [data, setData] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [restartGame, setRestartGame] = useState(false);
  const [isForm, setIsForm] = useState(true);
  const [score, setScore] = useState(0);
  const [isAllAnswerSelected, setIsAllAnswerSelected] = useState(true);
  const [API_URL, setAPI_URL] = useState();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // To stop first Render
  const firstRender = useRef(false);

  function startQuiz() {
    setStart((pre) => !pre);
  }

  function toggleDarkMode() {
    setDarkMode((pre) => !pre);
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }

  function createQuiz(URL) {
    setAPI_URL(URL);
    setIsForm((pre) => !pre);
  }

  function newGame() {
    setRestartGame((pre) => !pre);
    setIsPlaying(true);
    setLoading((pre) => !pre);
    setScore(0);
    setData(false);
    setIsAllAnswerSelected(true);
  }

  function backFunction() {
    setIsForm((pre) => !pre);
    setIsPlaying(true);
    setIsAllAnswerSelected(true);
  }

  function allAnswerSelected() {
    if (data.length != count) {
      setIsAllAnswerSelected(false);
    } else {
      setIsAllAnswerSelected(true);
    }
  }

  useEffect(() => {
    const mode = JSON.parse(localStorage.getItem("dark"));
    setDarkMode(!mode);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setData(quizData(data.results));
          setLoading((pre) => !pre);
          setCount(0);
        });
    } else {
      firstRender.current = true;
    }
  }, [restartGame, isForm]);

  function quizData(elements) {
    return elements.map((data) => ({
      options: setOptions(
        data.incorrect_answers.concat(data.correct_answer),
        data.correct_answer
      ).sort(() => 0.5 - Math.random()),
      questions: data.question,
      correctOption: data.correct_answer,
      id: nanoid(),
    }));
  }

  function optionClicked(clickId, questionId) {
    setData(
      data.map((allQuiz) => {
        if (allQuiz.id === questionId) {
          const elementData = allQuiz.options.map((option) => {
            if (!option.isHeld && option.id === clickId) {
              setCount((pre) => pre + 1);
            } else if (option.isHeld) {
              setCount((pre) => pre - 1);
            }

            if (option.id === clickId) {
              return {
                ...option,
                isHeld: !option.isHeld,
              };
            } else if (option.isHeld) {
              return {
                ...option,
                isHeld: !option.isHeld,
              };
            } else {
              return option;
            }
          });
          return {
            ...allQuiz,
            options: elementData,
          };
        } else {
          return allQuiz;
        }
      })
    );
  }

  function checkAnswer() {
    setIsPlaying((pre) => !pre);

    setData(
      data.map((allQuiz) => {
        const optionslist = allQuiz.options.map((option) => {
          if (option.isCorrect && option.isHeld) {
            setScore((pre) => pre + 1);
            return {
              ...option,
              isCorrectAnswer: true,
            };
          } else if (!option.isCorrect && option.isHeld) {
            return {
              ...option,
              isIncorrectAnswer: true,
            };
          } else if (!option.isCorrect && !option.isHeld) {
            return {
              ...option,
              isNotSelectedIncorrect: true,
            };
          } else if (option.isCorrect && !option.isHeld) {
            return {
              ...option,
              isNotSelectedCorrect: true,
            };
          } else {
            return option;
          }
        });
        return {
          ...allQuiz,
          options: optionslist,
        };
      })
    );
  }

  function setOptions(allOptions, correctAnswer) {
    return allOptions.map((option) => {
      return {
        value: option,
        id: nanoid(),
        isHeld: false,
        isCorrect: option === correctAnswer ? true : false,
        isCorrectAnswer: false,
        isIncorrectAnswer: false,
      };
    });
  }

  return (
    <div
      className={`font-[inter] min-h-screen relative z-0 bg-theme transition-all duration-300
         ${darkMode && "dark"} `}>
      <div className={darkMode ? "hidden" : ""}>
        <img
          src={topBg}
          alt="bgimg"
          className="-z-20 absolute right-0 top-0 w-[30%] md:w-[25%]"
        />
        <img
          src={bottomBg}
          alt="bgimg"
          className="-z-20 absolute left-0 bottom-0 w-[30%] md:w-[25%]"
        />
      </div>

      {isForm && (
        <div className="absolute right-5 top-5 z-50">
          <DarkMode darkMode={toggleDarkMode} mode={darkMode} />
        </div>
      )}

      {start ? (
        <StartPage startFunction={startQuiz} />
      ) : isForm ? (
        <QuizForm createQuiz={createQuiz} />
      ) : (
        <div>
          {loading ? (
            <LoadingScreen />
          ) : (
            <div className="min-h-screen min-w-full p-1 flex items-center justify-center flex-col space-y-2">
              <div className="w-full md:max-w-4xl p-2 md:p-0 flex justify-between items-center">
                <button
                  onClick={backFunction}
                  className="py-2 px-3 shadow-secondary shadow-md bg-primary text-sm rounded-lg font-[400] text-theme
                    md:px-5 md:py-3 md:font-semibold hover:scale-95 duration-100">
                  Back
                </button>

                {!start && (
                  <DarkMode darkMode={toggleDarkMode} mode={darkMode} />
                )}
              </div>

              <QuizPage
                elements={data}
                selectOption={optionClicked}
                isplaying={isPlaying}
              />

              {!isPlaying && count === data.length ? (
                <div className="flex items-center justify-center md:py-5 py-3 flex-col md:flex-row">
                  <div className="font-semibold text-xl mr-5">
                    <h1 className="font-semibold text-primary text-sm mb-3 md:mb-0 md:text-xl">
                      You scored {score}/{data.length} correct answers
                    </h1>
                  </div>
                  <button
                    onClick={newGame}
                    className="py-3 px-4 shadow-secondary shadow-md bg-primary text-sm rounded-lg font-[400] text-theme
                               md:p-4 md:px-5 md:font-semibold hover:scale-95 duration-100">
                    Play Again
                  </button>
                </div>
              ) : !isAllAnswerSelected ? (
                <div className="md:py-5 py-3 flex flex-col md:flex-row items-center justify-start md:space-x-5">
                  {!(data.length === count) && (
                    <h1 className="font-semibold text-primary text-sm mb-3 md:mb-0 md:text-xl">
                      {`${data.length - count} ${
                        data.length - count === 1 ? "Question" : "Questions"
                      } Remaining`}
                    </h1>
                  )}
                  <button
                    onClick={
                      data.length === count ? checkAnswer : allAnswerSelected
                    }
                    className="py-3 px-4  shadow-secondary shadow-md bg-primary text-sm rounded-lg font-[400] text-theme
                             md:py-4 md:px-5 md:font-semibold hover:scale-95 duration-100">
                    Check Answer
                  </button>
                </div>
              ) : (
                <div className="py-3">
                  <button
                    onClick={
                      count === data.length ? checkAnswer : allAnswerSelected
                    }
                    className="py-3 px-4  shadow-secondary shadow-md bg-primary text-sm rounded-lg font-[400] text-theme
                              md:py-4 md:px-5 md:font-semibold hover:scale-95 duration-100">
                    Check Answer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
