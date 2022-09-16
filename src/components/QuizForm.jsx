import React, { useState } from 'react';

const QuizForm = (props) => {

    const [formData, setFormData] = useState({
        category: '',
        difficulty: '',
        type: '',
        amount: "5"
    })

    // https://opentdb.com/api.php?amount=10

    const API_URL = `https://opentdb.com/api.php?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`

    function handleClick(event) {
        const { name, value } = event.target
        setFormData(preFormData => ({
            ...preFormData,
            [name]: value
        }))
    }


    return (
        <div className='text-sm p-2 md:text-base w-full min-h-screen flex justify-center items-center flex-col'>
            <h1 className='font-bold text-4xl text-[#293264] mb-4 text-center'>Create Quiz</h1>
            <p className='text-[#293264] font-medium text-lg'>Select what Types of Questions you want</p>
            <div className='space-y-4 rounded-2xl p-5  shadow-2xl shadow-blue-200'>
                <div>
                    <label htmlFor="amount" className='font-semibold text-gray-700 mr-2'>No of Questions :</label>
                    <input className='bg-gray-200 p-2 rounded-md w-20 outline-none' type="number" min="5" max="50" name="amount" id="no" value={formData.amount} onChange={handleClick} />
                </div>

                <div>
                    <label htmlFor="category" className='font-semibold mr-2 text-gray-700'>Select Category :</label>
                    <select className='p-2 bg-gray-200 rounded-md max-w-[60%]' name='category' onChange={handleClick}>
                        <option value="">All category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="type" className='font-semibold text-gray-700 mr-2'>Select Type :</label>
                    <select className='p-2 bg-gray-200 rounded-md' name='type' onChange={handleClick}>
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple choice</option>
                        <option value="boolean">True/False</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="difficulty" className='font-semibold text-gray-700 mr-2'>Select Difficulty :</label>
                    <select className='p-2 bg-gray-200 rounded-md' name='difficulty' onChange={handleClick}>
                        <option value="">Any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className='flex justify-between items-center mt-5 w-[70%] mx-auto'>
                    <button onClick={props.backBtn} className='p-2  shadow-[#293264]
                    shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                     hover:scale-95 duration-100'>Back</button>

                    <button onClick={() => props.createQuiz(API_URL)} className='py-3 px-4 shadow-[#293264]
                    shadow-md bg-[#293264] text-sm rounded-lg font-[400] text-white 
                       hover:scale-95 duration-100'>Play Quiz</button>
                </div>
            </div>
        </div >
    );
}

export default QuizForm;
