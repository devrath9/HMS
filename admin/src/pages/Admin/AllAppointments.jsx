import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { Admincontext } from '../../context/Admincontext'
import { toast } from 'react-toastify'
import { Appcontext } from '../../context/Appcontext'
import axios from 'axios'


const AllAppointments = () => {

  const { adminToken, getAllappointments, appointments, cancelAppointment,makeCashPayment, backendUrl } = useContext(Admincontext)
  const { calculateAge, slotDateFormat } = useContext(Appcontext)

  const [apptStatus, setApptStatus] = useState("All")
  const [doctorName, setDoctorName] = useState('')
  const [patientName, setPatientName] = useState('')
  const [filterdate, setFilterDate] = useState('')
   const [showfilter, setShowfilter] = useState(false)
  const [filteredData, setFilteredData]  = useState([])

  

  useEffect(() => {
    if (adminToken) {
      getAppointments()
    }

  }, [adminToken])

  const handlefilterClick=()=>{

    const filters ={
      patientName: null||patientName,
      doctorName :null||doctorName,
      appointStatus : apptStatus ==='All' ? null : apptStatus , //appointments function will ignore "All" bcoz of this
      filterdate : null||filterdate

    }

    getAppointments(filters)
  }

  const handleclearFilter=()=>{
    setDoctorName(''); setPatientName('');setApptStatus("All");setFilterDate('')
    getAppointments()       //will restore to default state of appointment page with no filters
  }

  const handleCancel = async(appointmentId)=>{
        await cancelAppointment(appointmentId);
        getAppointments()
  }

  const handlePayment = async(appointmentId)=>{
    await makeCashPayment(appointmentId)
    getAppointments()
  }


  const getAppointments = async(filteroptions={})=>{
    try{

    const {data} = await axios.post(backendUrl + '/api/admin/filteredData', filteroptions, { headers: { adminToken } })
    if(data.success){
      setFilteredData(data.filteredAppts.reverse())
      console.log(data.filteredAppts)
    }
    else{
      toast.error(data.message)
    }
  }catch(error){
    console.log(error.message)
    toast.error(error.message)
  }
  }



  return (
    <div className='w-full m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

  {/**--------------------------FILTERS------------------------------------------ */}
      <div className='border-rounded mt-3 mb-3 mx-2 px-2 py-1.5 text-sm'>
           
           <button onClick={()=>setShowfilter(!showfilter)}
           className={`flex md:hidden ${showfilter ? 'bg-green-500' :'bg-orange-500'} px-4 py-1 rounded font-semibold text-white mb-2`}>
            {showfilter ? 'Hide filters -' :'Show Filters +'}
            </button>

           {<div className={`${showfilter ? 'flex': 'hidden'} md:flex flex-wrap gap-3 py-0.5 items-center `}>

          
              <div className='relative'>
               <input type='text' 
                      placeholder='Search doctor'
                      className='w-40 h-9 px-8 border rounded-lg'
                      onChange={(e)=>setDoctorName(e.target.value)}
                      value={doctorName}/>

                <img src={assets.Search_icon} className="w-3 absolute left-3 top-1/2 transform -translate-y-1/2"/>  
                </div> 

               <div className='relative'>    
               <input type='text' 
                      placeholder='Search patient'
                      className='w-40 h-9 px-8 border rounded-lg'
                      onChange={(e)=>setPatientName(e.target.value)}
                      value={patientName}/>
                <img src={assets.Search_icon} className="w-3 absolute left-3 top-1/2 transform -translate-y-1/2"/> 
                </div> 
                
                <div className='relative'>
                <input type='text' 
                      placeholder='Search Date'
                      className='w-36 h-9 px-8 border rounded-lg'
                      onChange={(e)=>setFilterDate(e.target.value)}
                      value={filterdate}/> 
                <img src={assets.Search_icon} className="w-3 absolute left-3 top-1/2 transform -translate-y-1/2"/> 
                </div>  


               <div>
               <select onChange={(e)=>setApptStatus(e.target.value)} value={apptStatus} className='border rounded-lg px-3 py-1.5' name=" " id=" ">
               <option value='All'>All</option>
                <option value='Completed'> Completed</option>
                <option value='Upcoming'> Upcoming</option>
               
              </select>
               </div>
                 
               <button className='bg-primary px-4 py-1 rounded text-white'
                       onClick={handlefilterClick}>
                Filter
               </button>


               <button className='bg-orange-500 px-4 py-1 rounded font-semibold'
                       onClick={handleclearFilter}>
                Clear Filters
               </button>
           </div>}
      </div>



      <div className='bg-white border-rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll mx-1'>

        <div className='hidden md:w-full md:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] grid-flow-col py-3 px-6 font-semibold border-b mb-2 bg-gray-200 '>
          <p className=''>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p className='ml-6'>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {filteredData.map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-md:gap-2 gap-1 md:grid md: grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] grid-flow-col text-gray-600 py-3 px-6 border-b hover:bg-gray-50  '>
            <p className='hidden md:flex items-center'>{index + 1}</p>
            <div className='flex gap-2 items-center'>
              <div className='border-1 border-gray-400 w-8 h-8 '>
                <img className='w-[100%] h-[100%] rounded-full object-cover' src={item.userData.image} alt='' />
              </div>
              <p>{item.userData.name}</p>
            </div>
            <p className='flex items-center'>{calculateAge(item.userData.dob)}yrs</p>
            <p className='flex items-center'>{slotDateFormat(item.slotDate)} - {item.slotTime}</p>

            <div className='flex gap-2 items-center'>
              <img className='w-8 rounded-full bg-slate-300' src={item.docData.image} alt='' />
              <p>{item.docData.name}</p>
            </div>

            <p className='flex items-center'>${item.docData.fees}</p>

            <div>
                {item.suspended && <button className='border border-blue-700 text-blue-700 text-sm w-24 py-1 rounded' disabled>Suspended</button>}
                {item.cancelled && <button className='border border-red-700 text-red-700 text-sm w-24 py-1 rounded' disabled>Cancelled</button>}
                {item.isCompleted && <button className='border border-green-700 text-green-700 text-sm px-2 py-1 w-24 h-8 rounded' disabled>Completed</button>}
                {!item.isCompleted && !item.cancelled && !item.suspended 
                      && <div className='flex gap-1'>
                            <img onClick={() => { handleCancel(item._id) }} className='w-10 cursor-pointer hover:border-2 rounded-full border-red-400 ' src={assets.cancel_icon} alt='' />
                                  {item.paymentOnline || item.paymentCash
                                    ? <p className='text-xs text-green-700 font-semibold px-1.5 max-h-8 rounded flex items-center border border-green-700'>$ PAID</p>
                                    : <img onClick={()=>{handlePayment(item._id)}}
                                      className='w-10 cursor-pointer hover:border-2 rounded border-blue-400' src={assets.earning_icon} alt='' />
                                  }
                          </div>
                }

            </div>



          </div>


        ))}

      </div>
    </div>
  )
}

export default AllAppointments
