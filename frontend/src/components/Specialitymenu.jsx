import React from 'react'
import { specialityData} from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Specialitymenu = () => {
  return (
    <div id='speciality'
     className='flex flex-col items-center gap-4 py-16 text-gray-600'>

        <h1 className='text-3xl font-normal text-black '>Find by Speciality</h1>

      <div className='flex flex-col items-center justify-center mt-5 md:flex-row flex-wrap gap-4 '>
        {specialityData.map((item,index)=>(
            <Link className='flex flex-col items-center text-sm cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            onClick={()=>scrollTo(0,0)} 
            
            key={index} to={`/doctors/${item.speciality}`}>  
               <img src={item.image} alt=""/>
               <p >{item.speciality}</p>
            
            </Link>

        ))}
        </div>



      
    </div>
  )
}

export default Specialitymenu
