import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate= useNavigate()

    
  return (
   <div className='flex bg-primary rounded-lg px-6 md:px-10 lg:px-20 my-20'>
               {/* --------LEFT SIDE------------  */}
   
               <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] '>
                   <p className='text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading tight'>
                       Book Appointment <br /> with our Trusted Doctors</p>
   
                   
   
                   <button className='flex items-center gap-2 px-8 py-3 rounded-full text-gray-600 bg-white text-sm  m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                       Book Appointment <img src={assets.arrow_icon} className='w-3' alt=""/></button>
   
               </div>
   
   
   
               {/* ----------RIGHT SIDE------------  */}
   
   
               <div className='hidden md:block md:w-1/2 relative  '>
                   <img className=' absolute bottom-0 right-0 rounded-lg max-w-96'src={assets.appointment_img} alt="" />
               </div>
   
   
           </div>
  )
}

export default Banner
