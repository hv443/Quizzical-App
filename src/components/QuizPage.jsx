import React from 'react';
// import { useState } from 'react';

const QuizPage = (props) => {

    const allOptions = props.elements.map((elements, id) => {
        const options = (elements.incorrect_answers.concat(elements.correct_answer))

        console.log(options)

        return (
            <div key={id}>
                <h1 className='font-semibold text-xl text-sky-900 mb-4'>{elements.question}</h1>


                {options.map((e, id) => <button key={id} className='text-blue-900 px-4 font-semibold py-1 rounded-xl  border border-sky-900'>{e}</button>)}


                <hr className='my-5' />
            </div>
        )


    })

    // const quizElements = props.elements.map((elements, id) => {

    //     return (
    //         <div key={id}>
    //             <h1 className='font-semibold text-xl text-sky-900 mb-4'>{elements.question}</h1>
    //             {elements.incorrect_answers.map((options, id) =>
    //                 <button key={id} className='text-blue-900 px-4 font-semibold py-1 rounded-xl  border border-sky-900'>{options}</button>)}
    //             <button className='text-blue-900 px-4 font-semibold py-1 rounded-xl  border border-sky-900'>{elements.correct_answer}</button>
    //             <hr className='my-5' />
    //         </div>
    //     )
    // })


    return (
        <div className='px-24 py-14'>
            <div>
                {allOptions}
            </div>

            <div className='w-full text-center '>
                <button className='bg-blue-900  text-white font-semibold p-3 rounded-xl'>Check answers</button>
            </div>
        </div>
    );
}

export default QuizPage;
