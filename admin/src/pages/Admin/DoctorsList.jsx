import React from 'react'
import { useContext } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { useEffect } from 'react'

const DoctorsList = () => {

   const {doctors, getAlldoctors, adminToken, changeAvailability} = useContext(Admincontext)

   useEffect(()=>{
    if(adminToken){
      getAlldoctors()
    }
   },[adminToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>

      <div className='w-full flex flex-wrap gap-3 gap-y-6'>
      {
        doctors.map((item,index)=>(
          <div className='border border-indigo-200 rounded-lg max-w-56  cursor-pointer group 'key={index}>
            <img className='bg-indigo-100 group-hover:bg-primary transition-all duration-500'src={item.image} alt=''/>
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm '>{item.speciality}</p>
              <div className='flex items-center gap-2 mt-2 text-sm font-semibold text-zinc-800'>
                <input onChange={()=>{changeAvailability(item._id)}}type='checkbox' checked={item.available}/>
                <p>Available</p>
              </div>
              </div>

          </div>

        ))
      }
      </div>
    </div>
  )
}

export default DoctorsList
