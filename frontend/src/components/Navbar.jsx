import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { Appcontext } from '../context/Appcontext';

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const {token, setToken, userData} = useContext(Appcontext)

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => { navigate('/') }} className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-semibold'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden' />
        </NavLink>

        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden' />
        </NavLink>

        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden' />
        </NavLink>

        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex gap-2'>
        {token && userData ?
          <div className='flex items-center gap-3 cursor-pointer group relative'>
            <img className='w-8 h-8 rounded full' src={userData.image} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />

            <div className='absolute top-0 right-0 pt-14 text-base font-semibold text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-4 '>
                <p className='hover:text-black cursor-pointer'
                  onClick={() => navigate('/my-profile')}>My Profile</p>

                <p className='hover:text-black cursor-pointer'
                  onClick={() => navigate('/my-appointments')}>My Appointments</p>

                <p className='hover:text-black cursor-pointer'
                  onClick={logout}>Logout</p>
              </div>
            </div>


          </div> :

          <button onClick={() => navigate('/login')} className='bg-primary px-8 py-3 rounded-full text-white font-bold hidden md:block'>Create Account</button>
        }

        <img className='w-6 md:hidden'
        onClick={()=>setShowMenu(true)}src={assets.menu_icon} alt=''/>

        {/* ---------------MOBILE MENU------------------ */}

        <div className={` ${showMenu ? 'fixed w-full' :'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 bg-white overflow-hidden`}>
          <div className='flex flex-row justify-between mt-4 px-4'>
            <img className='w-36' src={assets.logo} alt=''/>
          <img  className='w-12 ' onClick={()=>{setShowMenu(false)}}src={assets.cross_icon} alt=''/>
          </div>
          

          <div className='flex flex-col mt-6 text-center font-medium gap-4 text-blue text-2xl '>
            <NavLink onClick={()=>setShowMenu(false)}to='/'><p className='px-4 py-2 rounded'>Home</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)}to='/doctors'><p className='px-4 py-2 rounded '>All Doctors</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)}to='/about'><p className='px-4 py-2 rounded '>About</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)}to='/contact'><p className='px-4 py-2 rounded'>Contact</p></NavLink>
          </div>
        </div>



      </div>

    </div>
  )
}

export default Navbar
