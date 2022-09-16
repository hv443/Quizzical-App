import React, { useEffect, useState } from 'react';

const FormSelect = () => {

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

    useEffect(() => {
        localStorage.setItem("URL", API_URL)
    }, [formData]);

    return (
        <div className='text-sm'>
            <h1 className='font-semibold text-lg mb-4'>Select what types of Questions you want</h1>

            <div>
                <label htmlFor="amount" className='font-semibold text-gray-700'>No of Questions :</label>
                <input className='bg-gray-200 p-2 rounded-md m-2 w-20 text-center appearance-none outline-none' type="number" min="5" max="50" name="amount" id="no" value={formData.amount} onChange={handleClick} />
            </div>

            <div>
                <label htmlFor="category" className='font-semibold text-gray-700'>Select Category :</label>
                <select className='p-2 bg-gray-200 rounded-md m-2 ' name='category' onChange={handleClick}>
                    <option value="9">General Knowledge</option>
                    <option value="">---All category---</option>
                    <option value="12">Music</option>
                    <option value="11">Film</option>
                    <option value="15">Video Games</option>
                    <option value="21">Sports</option>
                    <option value="17">Science & Nature</option>
                    <option value="26">Celebrities</option>
                    <option value="23">History</option>
                    <option value="27">Animals</option>


                </select>
            </div>

            <div>
                <label htmlFor="type" className='font-semibold text-gray-700'>Select Type :</label>
                <select className='p-2 bg-gray-200 rounded-md m-2' name='type' onChange={handleClick}>
                    <option value="">---Any Type---</option>
                    <option value="multiple">Multiple choice</option>
                    <option value="boolean">True/False</option>
                </select>
            </div>

            <div>
                <label htmlFor="difficulty" className='font-semibold text-gray-700'>Select Difficulty :</label>
                <select className='p-2 bg-gray-200 rounded-md m-2' name='difficulty' onChange={handleClick}>
                    <option value="">---Any---</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

        </div>
    );
}

export default FormSelect;
