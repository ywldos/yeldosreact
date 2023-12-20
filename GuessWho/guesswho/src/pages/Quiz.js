import React, {useRef, useState} from 'react'
import './Quiz.css';
import {data} from '../data';
import {doc, updateDoc, getDoc} from "firebase/firestore";
import {db} from "../firebase";
import {UserAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";


const Quiz = () => {

    const {user} = UserAuth();
    const navigate = useNavigate()


    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    const scoreId = doc(db, 'users', `${user?.email}`);

    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add('correct');
            }
        }
    }

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const saveScore = async () => {
        if (user?.email) {

            const docSnapshot = await getDoc(scoreId);
            const currentData = docSnapshot.data();

            const currentArray = currentData.result || [];
            const newArray = currentArray.concat([score, score]); // 10 10
            newArray.pop() // 10

            await updateDoc(scoreId, {
                result: newArray,
            });

            try {
                navigate('/Instruction')
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('Please log in to save a score');
        }
    };

    return (
        <>
            {user?.email ? <>
                    <div className='w-full text-white'>
                        <img className='w-full h-full object-cover'
                             src='https://w.forfun.com/fetch/c0/c03f8d9ce9c7bfcdd5f76174c53b238f.jpeg' alt='/'/>
                        <div
                            className='bg-black/80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 md:p-8 flex flex-col h-full w-[70%]'>
                            <h1 className='mb-8 mt-2 text-red-600 text-3xl md:text-5xl font-bold w-full'>My Quiz</h1>
                            <hr className={"w-10/12"}/>
                            {result ? <></> : <>
                                <h2 className={"mt-4 text-3xl mb-4 w-10/12"}>{index + 1}. {question.question}</h2>
                                <ul className={""}>
                                    <li className={'border text-2xl p-3 w-10/12 mb-2 rounded-md'} ref={Option1}
                                        onClick={(e) => {
                                            checkAns(e, 1)
                                        }}>{question.option1}</li>
                                    <li className={'border text-2xl p-3 w-10/12 mb-2 rounded-md'} ref={Option2}
                                        onClick={(e) => {
                                            checkAns(e, 2)
                                        }}>{question.option2}</li>
                                    <li className={'border text-2xl p-3 w-10/12 mb-2 rounded-md'} ref={Option3}
                                        onClick={(e) => {
                                            checkAns(e, 3)
                                        }}>{question.option3}</li>
                                    <li className={'border text-2xl p-3 w-10/12 mb-2 rounded-md'} ref={Option4}
                                        onClick={(e) => {
                                            checkAns(e, 4)
                                        }}>{question.option4}</li>
                                </ul>
                                <button
                                    className={"text-3xl border w-24 p-1 h-12 rounded-xl self-end relative right-[150px] bg-red-600 hover:bg-red-800"}
                                    onClick={next}>Next
                                </button>
                                <hr className={"w-10/12 mt-8 mb-8"}/>
                                <div className={"text-3xl"}>{index + 1} of {data.length} questions</div>
                            </>}
                            {result ? <>
                                <h2 className={"text-3xl mt-4"}>You scored {score} out of {data.length}</h2>
                                <button
                                    className={"text-3xl mt-8 p-2 border-red-600 border w-28 p-1 h-12 rounded-xl bg-red-600 hover:bg-red-800"}
                                    onClick={saveScore}>Submit
                                </button>
                            </> : <></>}

                        </div>
                    </div>
                </> :
                <>
                    <div className='w-full text-white'>
                        <div
                            className='bg-black/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 md:p-8 flex flex-col h-full w-[70%]'>
                            <h1 className='text-red-600 text-3xl md:text-5xl mt-14 font-bold text-center w-full'>Please
                                sign up or log in to take the test!</h1>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default Quiz