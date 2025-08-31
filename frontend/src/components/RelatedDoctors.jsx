import React, { useContext, useLayoutEffect } from 'react'
import { useState } from 'react'
import { Appcontext } from '../context/Appcontext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality, docID}) => {

    const navigate=useNavigate()

    const [relDoctors, setRelDoctors]= useState([])
    const {doctors}= useContext(Appcontext)

    const findRelated=()=>{
        if(doctors.length>0 && speciality){
            const data= doctors.filter((doc) => doc.speciality===speciality && doc._id!==docID)
            setRelDoctors(data)
        }

    }

    useEffect(()=>{
        findRelated()
    },[doctors, speciality, docID])


  return (
    
    <div className='w-full grid grid-cols-auto gap-4 pt-5 px-3 gap-y-6 sm:px-0 '>

    {relDoctors.map((item,index)=>(
        <div key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
        onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}}>
            <div className=''>
                <img className='bg-blue-50' src={item.image} alt=''/>
             </div>

            <div className='p-4'>
             <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
             <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>    
            
        </div>
    ))}
    </div>
  )
}

export default RelatedDoctors
