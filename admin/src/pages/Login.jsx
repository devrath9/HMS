import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { Admincontext } from '../context/Admincontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Doctorcontext } from '../context/Doctorcontext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const{setAdminToken, backendUrl} = useContext(Admincontext)
  const{setDtoken} = useContext(Doctorcontext)

  const [state, setState] = useState('Admin')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler= async(event)=>{
    event.preventDefault()

   //API CALL FOR ADMIN LOGIN
    try{

      if(state === 'Admin'){
         
        const {data} = await axios.post(backendUrl +'/api/admin/login', {email, password})
        if(data.success){
          // console.log(data.token)
          localStorage.setItem('adminToken', data.token)
          setAdminToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
      else{
        
        const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})

        if(data.success){
          localStorage.setItem('dtoken', data.token)
          setDtoken(data.token)
          navigate('/doctor-dashboard')
          // console.log(data.token)
          
        }else{
          toast.error(data.message)
        }
      }

    }catch(error){
       console.log(error.message)
      toast.error('Internal server occured')

    }
  }

  return (
    <form  onSubmit={onSubmitHandler} className=' min-h-[80vh] flex justify-center items-center mt-12'>
      <div className='flex flex-col gap-4 p-8 md:min-w-[400px] sm:min-w-96  text-gray-600 border rounded-xl shadow-lg '>
        <p className='text-2xl m-auto text-primary font-semibold '><span>{state} Login</span></p>
        <div>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
            type="email" className='w-full border border-[#DADADA] rounded-lg mt-1 p-2' required/>
        </div>

        <div>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} 
            type="password" className='w-full border border-[#DADADA] rounded-lg mt-1 p-2' required/>
        </div>

        <button className='bg-primary w-full text-white font-semibold py-2 rounded-lg mt-5'>Login</button>

        {
          state ==='Admin'
          ? <p>Doctor Login? <span className='text-primary underline cursor-pointer'onClick={()=>setState('Doctor')}>Click Here</span></p>
          :<p>Admin Login?   <span className='text-primary underline cursor-pointer'onClick={()=>setState('Admin')}>Click Here</span></p>
        }
      </div>
    </form>

  )
}

export default Login
