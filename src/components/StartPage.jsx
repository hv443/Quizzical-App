import React from 'react';

const StartPage = (props) => {
    return (
        <div className="w-screen h-screen text-[#293264] grid place-content-center text-center gap-3">
            <h1 className='font-semibold text-4xl tracking-wider'>Quizzical</h1>
            <p>Click on Start to play the Quiz</p>

            <button onClick={props.startFunction} className='bg-[#293264]  text-white font-semibold p-3 rounded-xl'>Start Quiz</button>
        </div >
    );
}

export default StartPage;
