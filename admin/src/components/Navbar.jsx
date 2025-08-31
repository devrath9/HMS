import React from 'react'
import { assets } from '../assets/assets_admin/assets'
import { useContext} from 'react'
import { Admincontext } from '../context/Admincontext'
import { useNavigate } from 'react-router-dom'
import { Doctorcontext } from '../context/Doctorcontext'


const Navbar = () => {
    
    const {adminToken, setAdminToken} = useContext(Admincontext)
    const {dtoken, setDtoken} = useContext(Doctorcontext)
    
    const navigate = useNavigate()
    const logout=()=>{
        
        navigate('/')
        adminToken && setAdminToken('')
        adminToken && localStorage.removeItem('adminToken')
        dtoken && setDtoken('')
        dtoken && localStorage.removeItem('dtoken')

    }
  return (
    <div className='flex justify-between items-center px-4 py-3 sm:px-10 border-b bg-[#F8F9FD]'>
      <div className='flex gap-2 items-center'>
        <img className = 'w-36 sm:w-40 ' src={assets.admin_logo} alt=''/>
        <p className='border border-gray-500 text-gray-500 px-2 py-0.5 rounded-full text-xs font-bold'> {adminToken ? 'Admin' : 'Doctor'}</p>
      </div>

      <button onClick={logout} className='bg-primary px-8 py-2 text-white rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
