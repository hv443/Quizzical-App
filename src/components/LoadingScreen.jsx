import React from 'react';

const LoadingScreen = () => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center space-x-3'>
            <h1 className='text-sm md:text-xl font-semibold text-[#293264]'>Loading Questions</h1>

            <img className="h-6 w-6 md:h-8 md:w-8" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />

        </div >
    );
}

export default LoadingScreen;
