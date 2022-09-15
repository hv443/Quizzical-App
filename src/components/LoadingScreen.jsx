import React from 'react';

const LoadingScreen = () => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center space-x-3'>
            <h1 className='text-2xl md:text-4xl font-semibold text-[#293264]'>Loading Questions</h1>

            <img class="h-8 w-8 md:h-12 md:w-12" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />

        </div >
    );
}

export default LoadingScreen;
