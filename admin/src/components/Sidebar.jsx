import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { Admincontext } from '../context/Admincontext'
import { assets } from '../assets/assets_admin/assets'
import { Doctorcontext } from '../context/Doctorcontext'

const Sidebar = () => {

  const {adminToken} = useContext(Admincontext)
  const {dtoken} = useContext(Doctorcontext)

    
  return (
    <div className='h-screen bg-white border-r'>
        {
         adminToken && <ul className='text-gray-700 flex flex-col gap-1 mt-5'>

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/'} >
            <img src={assets.home_icon} alt=''/>
            <p className='hidden lg:flex'>DashBoard</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt=''/>
            <p  className='hidden lg:flex'>Appointments</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt=''/>
            <p  className='hidden lg:flex'>Add Doctor</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-list'}>
            <img src={assets.people_icon} alt=''/>
            <p  className='hidden lg:flex'>Doctor List</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/patient-list'}>
            <img src={assets.people_icon} alt=''/>
            <p  className='hidden lg:flex'>Patient List</p>
        </NavLink>

      </ul>}

      {
         dtoken && <ul className='text-gray-700 flex flex-col gap-1 mt-5'>

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-dashboard'} >
            <img src={assets.home_icon} alt=''/>
            <p className='hidden lg:flex'>DashBoard</p>
        </NavLink>

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-appointments'}>
            <img src={assets.appointment_icon} alt=''/>
            <p  className='hidden lg:flex'>Appointments</p>
        </NavLink>

        

        <NavLink className={({isActive})=>`flex items-center gap-3 w-14 lg:min-w-72 py-3.5 px-3 lg:px-9 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt=''/>
            <p  className='hidden lg:flex'>Profile</p>
        </NavLink>

      </ul>}
    </div>
  )
}

export default Sidebar
