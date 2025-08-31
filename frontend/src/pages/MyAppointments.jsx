import React, { useContext, useEffect, useState } from 'react'
import {Appcontext} from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

  const { backendUrl, token, payOnline, getUserAppointments,appointments, cancelAppointment} = useContext(Appcontext)

  // const[appointments, setAppointments] = useState([])

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug','Sep', 'Oct', 'Nov', 'Dec']
  const slotDateFormat = (slotDate)=>{
    const date = slotDate.replace(/-/g, " ");
    return date

  }

  // const getUserAppointments = async()=>{
  //   try{

  //     const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}} )
  //     if(data.success){
  //       setAppointments(data.appointments.reverse())
  //       console.log(data.appointments);
        
  //     }
  //   }catch(error){
  //     console.log(error)
  //     toast.error(error.message)
  //   }
  // }

  // const cancelAppointment = async(appointmentId)=>{

  //   try{

  //     const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})
  //     if(data.success){
  //       toast.success(data.message)
  //       getUserAppointments()
  //       getDoctorsData()         //so that slot freed after cancellation can be seen without reloading on doctor page
  //     }
  //     else{
  //         toast.error(data.message)
  //     }
     
     
  //     }catch(error){
  //     console.log(error)
  //     toast.error(error.message)
  //   }
  // }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])


  return (
    <div className='flex flex-col gap-3'>
      <p className='text-medium font-medium text-zinc-700 border-b'>MY APPOINTMENTS</p>
    <div>
      {
        appointments.map((item,index)=>(
          <div key={index} className='grid grid-cols-[1fr_2fr] sm:flex sm:gap-5 py-3 border-b'>
            <div className=' '>
              <img className='w-36 bg-slate-400'src={item.docData.image} alt=''/>
            </div>

            <div className='flex-1 p-1 text-sm ml-3'>
             <p className='text-base font-semibold'>{item.docData.name}</p>
             <p className='bg-blue-300 px-1 py-1 max-w-36 text-center rounded-full'>{item.docData.speciality}</p>
             <p className='text-neutral-600'>Address:</p>
             <p>{item.docData.address.line1}</p>
             <p>{item.docData.address.line2}</p>
             <p className='font-semibold'><span className='text-neutral-600 font-normal'>Date and Time: </span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
             
             <div></div>
            

            <div className='p-3 flex flex-col justify-end gap-2'>
             {!item.cancelled && !item.suspended && !item.paymentOnline &&!item.paymentCash && !item.isCompleted &&
               <button onClick={()=>{payOnline(item._id)}}
                className='border border-gray-400 text-stone-600 text-sm min-w-48 py-2 hover:bg-primary hover:text-white transition-all duration-300'>
                Pay Online</button>}

              {item.paymentOnline &&!item.paymentCash && !item.cancelled &&!item.suspended &&!item.isCompleted && 
              <button className=' text-white bg-green-700 text-sm min-w-48  py-2' disabled>
                PAID ONLINE</button>}  

                {item.paymentCash && !item.cancelled &&!item.suspended &&!item.isCompleted && 
                <button className=' text-white bg-green-700 text-sm min-w-48  py-2' disabled>
                  PAID CASH</button>}   
               
             {!item.cancelled && !item.suspended &&  !item.isCompleted &&
               <button onClick={()=>{cancelAppointment(item._id)}} 
                 className='border border-gray-400 text-stone-600 text-sm min-w-48  py-2 hover:bg-red-600 hover:text-white transition-all duration-300'>
                Cancel Appointment</button>}
             
             {item.cancelled  && !item.isCompleted && 
             <button className='border border-red-700 text-red-700 text-sm min-w-48  py-2' disabled>
              Appointment Cancelled</button>}   


             {item.suspended && !item.isCompleted && 
             <button className='border border-blue-700 text-blue-700 text-sm min-w-48  py-2' disabled>
              Appointment Suspended</button>}   

             {item.isCompleted && 
             <button className='border border-green-700 text-green-700 text-sm min-w-48  py-2' disabled>
              Completed</button>} 
            </div>
            <hr/>
          </div>
          
        ))
      }
    </div>
    </div>
  )
}

export default MyAppointments
