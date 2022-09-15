import React from 'react';
import UserSelectForm from './FormSelect';


const StartPage = (props) => {
    return (

        <div className='min-h-screen  text-[#293264] grid place-items-center text-center place-content-center  gap-3'>

            <div >
                <h1 className='font-semibold text-3xl tracking-wider md:text-4xl'>Quizzical</h1>
                <p className='text-sm font-light md:text-lg'>Click on Start to play the Quiz</p>
            </div>

            <button onClick={props.startFunction} className='bg-[#293264] px-4 py-2  shadow-[#293264] shadow-md text-white font-[400] text-sm rounded-md w-fit
             md:text-lg  hover:bg-sky-900'>Start Quiz</button>

            <UserSelectForm />

        </div >
    );
}

export default StartPage;
