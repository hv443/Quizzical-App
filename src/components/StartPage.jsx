import React from 'react';

const StartPage = (props) => {
    return (
        <div className="min-h-screen w-full grid place-content-center text-center ">
            <h1 className='font-semibold text-blue-900 text-3xl tracking-wider mb-1'>Quizzical</h1>
            <p className='mb-6 text-blue-900'>Click on Start to play the Quiz</p>

            <button onClick={props.startFunction} className='bg-blue-900 text-white font-semibold p-3 rounded-xl'>Start Quiz</button>
        </div>
    );
}

export default StartPage;
