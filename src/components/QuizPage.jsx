import React from 'react';
import { useEffect, useState } from 'react';

const QuizPage = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(e => {
                setData(e.results)
                console.log(e.results)
            })

    }, [0])

    const d = data.map((e, id) => {

        const options = e.incorrect_answers.map(a => a)

        return (
            <div key={id}>
                <h1 className='font-semibold text-xl text-sky-900 mb-4'>{e.question}</h1>
                <p className='text-blue-900 px-4 font-semibold py-1 rounded-xl w-fit border border-sky-900'>{options}</p>
                <hr className='my-5' />
            </div>
        )
    })


    return (
        <div className='px-24 py-14'>
            <div>
                {d}
            </div>

            <div className='w-full text-center '>
                <button className='bg-blue-900  text-white font-semibold p-3 rounded-xl'>Check answers</button>
            </div>
        </div>
    );
}

export default QuizPage;
