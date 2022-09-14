import React from 'react';
import { decode } from 'html-entities';

const QuizPage = (props) => {


    const quizes = props.elements.map((allElements, id) => {

        const questions = allElements.questions

        const options = allElements.options.map((option, id) => {

            let optionBgColor = ""
            if (option.isCorrectAnswer) {
                optionBgColor = "bg-green-400 border-green-400"
            } else if (option.isIncorrectAnswer) {
                optionBgColor = 'bg-red-300 border-red-300 text-gray-500'
            }
            else if (option.isNotSelectedCorrect) {
                optionBgColor = "bg-green-400 border-green-400"
            }
            else if (option.isNotSelectedIncorrect) {
                optionBgColor = "text-gray-400 border-gray-400"
            } else {
                optionBgColor = option.isHeld ? "bg-blue-300 border-blue-300" : "bg-white border-gray-500 "
            }

            return (
                <button key={id} onClick={() => { props.selectOption(option.id, allElements.id) }}
                    className={` ${optionBgColor} 
                        ${props.isplaying ?
                            "cursor-not-allowed"
                            : "cursor-pointer hover:bg-blue-200 hover:border-blue-200"} 

                              md:text-sm text-sm font-[Karla]
                            font-[400] mr-3 mb-3 border  text=[#4d5d9e] text-center p-1 px-2  rounded-md `}>{decode(option.value)}</button>
            )
        })

        return (
            <div key={id} className='text-[#293264] max-w-[90%] space-y-3 mb-4 md:max-w-4xl'>
                <div className='mb-4'>
                    <h1 className='font-semibold text-m md:text-xl'>{decode(questions)}</h1>
                </div>

                <div>
                    {options}
                </div>

                <hr />
            </div>
        )
    })

    return (
        <div className='w-[90%] md:max-w-4xl'>

            {quizes}

        </div>
    );
}

export default QuizPage;
