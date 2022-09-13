import React from 'react';
// import { useState } from 'react';

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
                optionBgColor = option.isHeld ? "bg-blue-300 border-blue-300" : "bg-white "
            }

            return (
                <div key={id} className='inline-block'>
                    <button onClick={() => { props.selectOption(option.id, allElements.id) }}
                        className={`border-1 ${optionBgColor} 
                        ${props.isplaying ?
                                "cursor-pointer  hover:bg-blue-200 hover:border-blue-200"
                                : "cursor-not-allowed"} 
                             border-blue-700 md:text-sm text-[12px] md:mr-5 
                            font-semibold border text-center py-2 px-3 rounded-xl`}>{option.value}</button>
                </div>
            )
        })

        return (
            <div className='text-gray-900' key={id}>
                <div>
                    <h1 className='font-semibold text-m md:text-xl'>{questions}</h1>
                </div>

                <div>
                    {options}
                </div>

                <hr className='mt-5 mb-5' />
            </div>
        )
    })



    return (
        <div className='w-full'>

            {quizes}

        </div>
    );
}

export default QuizPage;
