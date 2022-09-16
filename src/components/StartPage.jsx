import React from 'react';

const StartPage = (props) => {
    return (

        <div className='min-h-screen  text-[#293264] grid place-items-center text-center place-content-center  gap-3'>

            <div >
                <h1 className='font-semibold text-4xl tracking-wider md:text-4xl'>Quizzical</h1>
                <p className='text-sm font-light md:text-lg'>Click on Start to play the Quiz</p>
            </div>

            <button onClick={props.startFunction} className='bg-[#293264] px-8 hover:scale-95 duration-100 py-2  shadow-[#293264] shadow-md text-white font-[500] text-sm rounded-md w-fit
             md:text-lg  hover:bg-sky-900'>Start</button>

        </div >
    );
}

export default StartPage;
