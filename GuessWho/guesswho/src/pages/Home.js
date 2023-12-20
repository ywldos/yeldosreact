import React from 'react'
import Main from "../components/Main"
import Row from "../components/Row";
import requests from '../Requests'
const Home = () =>{
    return(
        <>
            <Main />
            <Row RowID='1'  title='Up coming' fetchURL={requests.requestUpcoming}/>
            <Row RowID='2'  title='Popular' fetchURL={requests.requestPopular}/>
            <Row RowID='3'  title='Trending' fetchURL={requests.requestTrending}/>
            <Row RowID='4'  title='TopRated' fetchURL={requests.requestTopRated}/>
            <div className='w-full flex flex-col items-center justify-center mt-8'>
                <h1 className='text-3xl font-bold mb-4 text-white'>When watching movies</h1>
                <div className='flex justify-around items-center w-full max-w-6xl px-10'>
                    <div className='text-center bg-gray-800 rounded-xl'>
                        <a href="https://www.doritos.com/" target="_blank" rel="noopener noreferrer">
                            <h1 className='text-white mb-2 text-xl font-bold mt-5'>EAT</h1>
                            <img src="https://logohistory.net/wp-content/uploads/2023/11/Doritos-Logo.png" alt="Doritos" className='h-16 md:h-24' />
                            <p className='text-white text-xl font-bold mb-5'>For the Bold!</p>
                        </a>
                    </div>
                    <div className='w-200 text-center bg-gray-800 rounded-xl flex'>
                        <a href="https://www.coca-colacompany.com/" target="_blank" rel="noopener noreferrer">
                            <h1 className='text-white mb-2 text-xl font-bold mt-5'>DRINK</h1>
                            <img src="https://logos-world.net/wp-content/uploads/2020/03/Coca-Cola-Logo-1987-2009.png" alt="Coca-Cola" className='h-16 md:h-24'/>
                            <p className='text-white text-xl font-bold mb-5'>Sign of good taste!</p>
                        </a>
                    </div>
                    <div className='text-center bg-gray-800 rounded-xl'>
                        <a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">
                            <h1 className='text-white mb-2 text-xl font-bold mt-5'>CHEW</h1>
                            <img src="https://seeklogo.com/images/W/wrigleys-eclipse-logo-5ADECF7823-seeklogo.com.png" alt="Eclipse" className='h-16 md:h-24' />
                            <p className='text-white text-xl font-bold mb-5'>Powerful Fresh Breath!</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home