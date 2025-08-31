import React, { useContext, useEffect, useState } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { Appcontext } from '../../context/Appcontext'
import { assets } from '../../assets/assets_admin/assets'
import Modal from '../../components/Modal'
import ModalAdmin from '../../components/ModalAdmin'

const PatientList = () => {

  const {patients, getAllpatients,adminToken} = useContext(Admincontext)
  const { calculateAge } = useContext(Appcontext)

   const [openModal, setOpenModal] = useState(false)
  const [modalInfo, setModalInfo] = useState([])
  const [patientName, setPatientName]  = useState('')

 

  

   useEffect(()=>{
     if(adminToken){
       getAllpatients()       //default page when no name in input query
     }
   },[adminToken])


   const handleClick = ()=>{
    
     getAllpatients(patientName)    //api will run on click taking patientname as req.body parameter
   }

  return (
    <div className='w-full mt-2 px-2'>
      <div className='font-semibold text-lg ml-4'>Patient List</div>
      
      {/**-----------------FILTER SEARCH BY PATIENT NAME------------- */}
      <div className='flex flex-wrap p-2 mt-3 text-sm gap-2 items-center'>
          <div className='relative'>
                <input type='text' 
                placeholder='Search patient'
                className='w-40 h-9 px-8 border rounded-lg'
                onChange={(e)=>setPatientName(e.target.value)}
                value={patientName}/>
         
                <img src={assets.Search_icon} className="w-3 absolute left-3 top-1/2 transform -translate-y-1/2"/>  
          </div> 
          <button className='bg-primary px-4 py-1.5 rounded text-white font-semibold'
                  onClick={handleClick}>
                Filter
          </button>
          <button className='bg-orange-500 px-4 py-1.5 rounded font-semibold'
                  onClick={()=>{setPatientName(''); getAllpatients()}}>
                Reset
          </button>

      </div>

      {/**-------------patient list--------------------------- */}

      <div className='w-[90%] max-h-[80vh] overflow-y-scroll mt-3 px-2'>
        <div className='flex flex-wrap gap-4 mt-2'>
          {patients.map((item,index)=>(
            <div key={item._id} className='border border-indigo-200 p-0.5 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
            
               <div className=' w-56 h-56 '>
                  <img className='w-[100%] h-[100%] object-cover rounded-t-lg' src={item.image} alt='' /> 
                </div>
            
            <div className=' px-4 pt-3 bg-indigo-50 flex justify-between items-center '>
              <div>
              <p className='text-md font-semibold'>{item.name}</p>
              <p className='text-gray-500 text-sm'>{calculateAge(item.dob)} yrs</p>
              </div>
              
              <img onClick={()=>{ setOpenModal(true);setModalInfo(patients[index])}} 
              className='w-7 h-7 hover:w-8 hover:h-8 transition-all duration-50 'src={assets.Info_icon} alt=''/>
            </div>

           
          </div>))}

        </div>

      </div>

      {openModal && <ModalAdmin onClose={()=>setOpenModal(false)} patientInfo={modalInfo}/>}
      
    </div>
  )
}

export default PatientList
