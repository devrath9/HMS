import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { Appcontext } from '../context/Appcontext'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(Appcontext)

  const [state, setState] = useState('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {

      if (state === 'signup') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          // localStorage.setItem('token', data.token)
          // setToken(data.token)
          toast.success(data.message)
          setState('login')
          setEmail('')
          setPassword('')
          
        }
        else {
          toast.error(data.message)
        }

      }
      else {

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(data.message)
    }

  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col m-auto gap-3 p-4 min-w-[350px] sm:min-w-96 border rounded-lg text-zinc-700 shadow-lg'>
        <p className='text-2xl font-semibold text-center'>{state === 'signup' ? 'Create Account' : 'Login'}</p>
        <p className='text-sm text-center'>Please {state === 'signup' ? 'sign up' : 'log in'} to book appointment</p>


        {state === 'signup' && <div>
          <p className='text-sm mb-1'>Full Name</p>
          <input type='text' onChange={(e) => setName(e.target.value)} value={name} required
            className='w-full border border-zinc-300 p-2 mt-1 rounded' />
        </div>}

        <div>
          <p className='text-sm mb-1'>Email</p>
          <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} required
            className='w-full border border-zinc-300 p-2 mt-1 rounded' />
        </div>

        <div>
          <p >Password</p>
          <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required
            className='w-full border border-zinc-300 p-2 mt-1 rounded' />
        </div>


        <button type='submit' className='bg-primary rounded px-5 py-2 text-white text-medium mt-3'>{state === 'signup' ? 'Create Account' : 'Login'}</button>

        {
          state === 'signup' ?
            <p className='text-sm mt-2 text-center'>Already have an account? <span onClick={() => { setState('login') }} className='text-primary underline cursor-pointer'>Login here</span></p> :
            <p className='text-sm mt-2  text-center'>Create a new account? <span onClick={() => { setState('signup') }} className='text-primary underline cursor-pointer'>Click here</span></p>

        }
      </div>
    </form>
  )
}

export default Login
