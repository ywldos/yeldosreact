import React, {useEffect, useState} from 'react'
import axios from "axios";
import Movie from "./Movie";
// import HeartOutlined from "@ant-design/icons"
import {MdChevronLeft, MdChevronRight} from "react-icons/md";

const Row = ({title, fetchURL, RowID}) => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    // console.log(movies)
    const toLeft = () =>{
        let left = document.getElementById('slider' + RowID)
        left.scrollLeft = left.scrollLeft - 300
    }
    const toRight = () =>{
        let right = document.getElementById('slider' + RowID)
        right.scrollLeft = right.scrollLeft + 300
    }
    return (
        <>
            <h2 className={'text-white font-bold md:text-xl p-4'}>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={toLeft}
                               className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                               size={40}/>
                <div id={'slider' + RowID}
                     className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {movies.map((item, id) => (
                        <Movie key={id} item={item}/>
                    ))}
                </div>
                <MdChevronRight onClick={toRight}
                                className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                                size={40}/>
            </div>
        </>

    )
}

export default Row