import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'

const TopDoctors = () => {
    
    const navigate= useNavigate()
    const {doctors}= useContext(Appcontext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10 '>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 px-3 gap-y-6 sm:px-0 2xl:grid-cols-6'>

        {doctors.slice(0,8).map((item,index)=>(
            <div key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            onClick={()=>{navigate(`/appointment/${item._id}`)}}>
                <div className=''>
                    <img className='bg-blue-50' src={item.image} alt=''/>
                 </div>

                <div className='p-4'>
                  <div className='flex items-center gap-2 text-green-700 text-sm'>
                    <p className='w-2 h-2 rounded-full bg-green-700'></p><p>Available</p>
                  </div>
                 <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                 <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>    
                
            </div>
        ))}
        </div>
        
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}className='bg-blue-100 text-gray-800 px-8 py-3 rounded-full mt-5 font-medium hover:bg-blue-200'>MORE</button>

      
    </div>
  )
}

export default TopDoctors
