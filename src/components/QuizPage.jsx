import React from "react";
import { decode } from "html-entities";

const QuizPage = (props) => {
  const quizes = props.elements.map((allElements, id) => {
    const questions = allElements.questions;

    const options = allElements.options.map((option, id) => {
      let optionBgColor = "";
      if (option.isCorrectAnswer) {
        optionBgColor = "bg-correctState border-correctState";
      } else if (option.isIncorrectAnswer) {
        optionBgColor = "bg-incorrectState border-incorrectState text-offState";
      } else if (option.isNotSelectedCorrect) {
        optionBgColor = "bg-correctState border-correctState";
      } else if (option.isNotSelectedIncorrect) {
        optionBgColor = "text-offState border-offState";
      } else {
        optionBgColor = option.isHeld
          ? "bg-activeState border-activeState"
          : "bg-theme border-secondary hover:bg-hoverState hover:border-hoverState";
      }

      return (
        <button
          key={id}
          disabled={!props.isplaying}
          onClick={() => {
            props.selectOption(option.id, allElements.id);
          }}
          className={` ${optionBgColor} 
                        ${
                          !props.isplaying
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } 
                              md:text-sm text-sm font-[Karla] duration-300
                             border mr-3 mb-3 md:mr-5
                             text-secondary text-center py-2 px-4 rounded-md
                             md:px-8 `}
        >
          {decode(option.value)}
        </button>
      );
    });

    return (
      <div
        key={id}
        className="text-secondary space-y-4 mb-3 last-of-type:mb-0 max-w-4xl"
      >
        <div className="mb-4">
          <h1 className="font-semibold text-m md:text-xl">
            {decode(questions)}
          </h1>
        </div>

        <div>{options}</div>

        <hr className="border-primary h-[1px] " />
      </div>
    );
  });

  return (
    <div className=" md:max-w-4xl rounded-2xl md:p-5 px-5 md:shadow-2xl md:shadow-primary ">
      {quizes}
    </div>
  );
};

export default QuizPage;
