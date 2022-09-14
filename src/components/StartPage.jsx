import React from 'react';
import UserSelectForm from './UserSelectForm';


const StartPage = (props) => {
    return (

        <div className="min-h-screen text-[#293264] grid place-items-center place-content-center text-center gap-5">

            <div>
                <h1 className='font-semibold text-3xl tracking-wider md:text-4xl'>Quizzical</h1>
                <p className='text-sm md:text-lg'>Click on Start to play the Quiz</p>
            </div>

            <UserSelectForm />

            <button onClick={props.startFunction} className='bg-[#293264] py-2 px-3 text-white font-[400] text-sm rounded-md w-fit md:text-lg  hover:bg-sky-900'>Start Quiz</button>

        </div >
    );
}

export default StartPage;
