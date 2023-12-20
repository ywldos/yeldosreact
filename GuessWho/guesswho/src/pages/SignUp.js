import React, {useState} from 'react'
import {UserAuth} from '../context/AuthContext'
import { useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user, signUp} = UserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signUp(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='w-full h-screen'>
                <img className='hidden sm:block absolute w-full h-full object-cover'
                     src='https://i.pinimg.com/originals/62/52/8e/62528e00b1bd7b58fa8e224d53782f62.jpg' alt='/'/>
                <div className='fixed w-full px-4 py-24 z-50'>
                    <div className='max-w-[450px] h-[600px] mx-auto bg-black/70 text-white'>
                        <div className='max-w-[320px] mx-auto py-16'>
                            <h1 className='text-3xl font-bold '>Sign Up</h1>
                            <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                                <input onChange={(e) => setEmail(e.target.value)}
                                       className='p-3 my-2 bg-gray-600 rounded ' type='email' placeholder='Email'/>
                                <input onChange={(e) => setPassword(e.target.value)}
                                       className='p-3 my-2 bg-gray-600 rounded ' type='password'
                                       placeholder='Password'/>
                                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
                                <div className='flex justify-between items-center text-gray-300'>
                                    <p>
                                        <input className='mr-2' type='checkbox'/> Remember me
                                    </p>
                                    <p>
                                        Need Help?
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;