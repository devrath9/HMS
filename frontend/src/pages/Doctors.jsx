import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'

const Doctors = () => {

  // const params= useParams()
  // console.log(params)
  const navigate = useNavigate()

  const {speciality} = useParams()
   console.log(speciality)

  const {doctors} = useContext(Appcontext)
  const[doctorFilter, setDoctorFilter] = useState([])
  const[showFilter, setShowFilter]=useState(false)

  const applyFilter=()=>{
    if(speciality){
      setDoctorFilter(doctors.filter((doc)=> doc.speciality === speciality))
    }
    else
    setDoctorFilter(doctors)
  }

  useEffect(()=>{
    applyFilter()
  },[doctors, speciality])



  return (
    <div>
      <p className='text-medium font-medium mb-3 '>Browse through the doctors specialities</p>
      <div className='flex flex-col md:flex-row gap-5 mt-5'>
        <button onClick={()=>setShowFilter(prev=>!prev)}
        className='bg-primary py-1 text-white w-32 rounded m-auto cursor-pointer text-semibold md:hidden'>Filters</button>


      <div className={`flex flex-col gap-4 ${showFilter ? 'flex' :'hidden md:flex'}`}>
        <p onClick={()=>{speciality==='General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')}}
        className={`border border-gray-400 pl-3 pr-12 py-1 text-sm text-gray-500 rounded-md cursor-pointer hover:text-gray-950 ${speciality==="General Physician" ? 'bg-indigo-200 text-gray-950' : ""}`}>General Physician</p>

        <p onClick={()=>{speciality==='Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}}
        className={`border border-gray-400 pl-3 pr-12 py-1 text-sm text-gray-500 rounded-md cursor-pointer hover:text-gray-950 ${speciality==="Gynecologist" ? 'bg-indigo-200 text-gray-950' : ""}`}>Gynecologist</p>
        
        <p onClick={()=>{speciality==='Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}}
        className={`border border-gray-400 pl-3 pr-12 py-1 text-sm text-gray-500 rounded-md cursor-pointer hover:text-gray-950 ${speciality==="Dermatologist" ? 'bg-indigo-200 text-gray-950' : ""}`}>Dermatologist</p>
        
        <p onClick={()=>{speciality==='Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')}}
        className={`border border-gray-400 pl-3 pr-12 py-1 text-sm text-gray-500 rounded-md cursor-pointer hover:text-gray-950 ${speciality==="Pediatrician" ? 'bg-indigo-200 text-gray-950' : ""}`}>Pediatrician</p>
        
        <p onClick={()=>{speciality==='Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}}
        className={`border border-gray-400 pl-3 pr-12 py-1 text-sm text-gray-500 rounded-md cursor-pointer hover:text-gray-950 ${speciality==="Neurologist" ? 'bg-indigo-200 text-gray-950' : ""}`}>Neurologist</p>
        
        <p onClick={()=>{speciality==='Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}}
        className={`border border-gray-400 pl-3 pr-12 py-1 text-sm text-gray-500 rounded-md cursor-pointer hover:text-gray-950 ${speciality==="Gastroenterologist" ? 'bg-indigo-200 text-gray-950' : ""}`}>Gastroenterologist</p>
        

      </div>

     <div className='w-full grid grid-cols-auto gap-4'>
      {
      doctorFilter.map((item,index)=>(
        <div key={index} className='border border-blue-200 mb-4 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
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

    </div>

     
      
    </div>
  )
}

export default Doctors
