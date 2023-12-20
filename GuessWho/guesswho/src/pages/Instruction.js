import React, {useEffect, useState} from 'react'
import './Quiz.css';
import { doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import {UserAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";


const Instruction = () => {

    const [results, setResults] = useState(0);
    const navigate = useNavigate()
    const {user} = UserAuth();

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setResults(doc.data()?.result);
        });
    }, [user?.email]);

    const handleQuiz = async () =>{
        try{
            navigate('/Quiz')
        }catch (error){
            console.log(error)
        }
    }

    const highScore = () => {
        const values = Object.values(results);
        console.log(values);

        values.sort();

        console.log("Values: ", values);

        const sortedObject = {};
        for (const value of values) {
            sortedObject[value] = results[value];
        }

        console.log(sortedObject)

        const lastKey = Object.keys(sortedObject).pop();

        return(lastKey)
    }

    return (

        <>
            {user?.email ? <>
                <div className='w-full text-white'>
                    <img className='w-full h-full object-cover'
                         src='https://w.forfun.com/fetch/c0/c03f8d9ce9c7bfcdd5f76174c53b238f.jpeg' alt='/'/>
                    <div className='bg-black/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 md:p-8 flex flex-col h-full w-[70%]'>
                        <h1 className='text-red-600 mt-8 text-3xl md:text-5xl font-bold text-center w-full'>Welcome to movie quiz</h1>
                        <p className='text-white text-2xl text-center mt-4'>Quiz consists of 15 questions</p>
                        {results ? <>
                            <p className='text-white text-2xl text-center mt-4'>Your total attempts: {results.length}  </p>
                            <p className='text-white text-2xl text-center mt-4'>Your high score: {highScore()} / 15  </p>
                        </> : <>
                            <p className='text-white text-2xl text-center mt-4'>Your total attempts:   </p>
                            <p className='text-white text-2xl text-center mt-4'>Your high score: / 15  </p>
                        </>
                        }
                        <button type="button" onClick={handleQuiz} className="text-white mt-4 self-center w-52 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Start the quiz</button>
                    </div>
                </div>
            </> : <>
                <div className='w-full text-white'>
                    <div className='bg-black/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 md:p-8 flex flex-col h-full w-[70%]'>
                        <h1 className='text-red-600 text-3xl mt-14 md:text-5xl font-bold text-center w-full'>Please sign up or log in to take the test!</h1>
                    </div>
                </div>
            </>}

        </>
    )
}

export default Instruction;