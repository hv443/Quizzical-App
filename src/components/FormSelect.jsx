import React, { useEffect, useState } from 'react';

const FormSelect = () => {

    const [formData, setFormData] = useState({
        category: '9',
        difficulty: 'easy',
        type: 'multiple',
        number: 5
    })

    const API_URL = `https://opentdb.com/api.php?amount=${formData.number}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`

    function handleClick(event) {
        const { name, value } = event.target
        setFormData(preFormData => ({
            ...preFormData,
            [name]: value
        }))
    }
    console.log(API_URL)

    useEffect(() => {
        localStorage.setItem("URL", API_URL)
    }, [formData]);

    return (
        <div>
            <h1 className='font-semibold text-xl mb-4'>Select what types of question you want</h1>

            <div>
                <label htmlFor="no">No of Questions :</label>
                <input className='bg-gray-200 p-2 rounded-md m-2 appearance-none outline-none' type="number" min="5" max="50" name="number" id="no" value={formData.number} onChange={handleClick} />
            </div>

            <div>
                <label htmlFor="category">Select Category :</label>
                <select className='p-2 bg-sky-100 rounded-md m-2 ' name='category' onChange={handleClick}>
                    {/* <option value="9">All</option> */}
                    <option value="9">General Knowledge</option>
                    <option value="21">Sports</option>
                    <option value="23">History</option>
                </select>
            </div>

            <div>
                <label htmlFor="type">Select Type :</label>
                <select className='p-2 bg-sky-100 rounded-md m-2' name='type' onChange={handleClick}>
                    {/* <option value="all">All</option> */}
                    <option value="multiple">Multiple choice</option>
                    <option value="boolean">True/False</option>
                </select>
            </div>

            <div>
                <label htmlFor="difficulty">Select Difficulty :</label>
                <select className='p-2 bg-sky-100 rounded-md m-2' name='difficulty' onChange={handleClick}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

        </div>
    );
}

export default FormSelect;
