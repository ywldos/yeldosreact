import React, {useEffect, useState} from 'react'
import requests from '../Requests'
import axios from 'axios'
import {Button} from 'antd'
import {useNavigate} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";

const Main = () => {
    const [movies, setMovies] = useState([])
    const navigate = useNavigate()
    const movie = movies[Math.floor(Math.random() * movies.length)]
    const {user} = UserAuth();

    useEffect(() => {
        axios.get(requests.requestPopular).then((response) => {
            setMovies(response.data.results)
        })
    }, [])
    console.log(movie)

    const handleQuiz = async () => {
        if (!user?.email) {
            alert('Please log in before go to quiz')
        } else {
            try {
                navigate('/Instruction')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='w-full h-[550px] text-white'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
                <img className='w-full h-full object-cover'
                     src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}>
                </img>
                <div className='absolute w-full top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
                    <div className='my-4'>
                        <Button onClick={handleQuiz} className='border bg-gray-300 text-black border-gray-300 px-5'
                                type='primary'>Go To
                            Quiz</Button>
                    </div>
                    <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{movie?.overview}</p>

                </div>
            </div>
        </div>
    )
};
export default Main;