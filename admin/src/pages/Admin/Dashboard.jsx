import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { assets } from '../../assets/assets_admin/assets'
import { Appcontext } from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const { adminToken, dashData, getDashData } = useContext(Admincontext)
  const { slotDateFormat } = useContext(Appcontext)

  const navigate = useNavigate()

  useEffect(() => {
    if (adminToken) {
      getDashData()
    }
  }, [])

  return dashData && (
    <div className='m-5 max-h-[90vh] overflow-y-scroll mx-5'>

      <div className='flex flex-wrap gap-3 '>

        <div className='flex items-center gap-2 bg-white p-4 min-w-56 border-2 rounded-lg border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-20' src={assets.doctor_icon} alt='' />
          <div>
            <p className='font-semibold text-4xl text-gray-800'>{dashData.doctors}</p>
            <p className='text-gray-600'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-56 border-2 rounded-lg border-gray-100 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-20' src={assets.appointments_icon} alt='' />
          <div>
            <p className='font-semibold text-4xl text-gray-800'>{dashData.appointments}</p>
            <p className='text-gray-600'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-5 min-w-56 border-2 rounded-lg border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-20' src={assets.patients_icon} alt='' />
          <div>
            <p className='font-semibold text-4xl text-gray-800'>{dashData.patients}</p>
            <p className='text-gray-600'>Patients</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-5 min-w-56 border-2 rounded-lg border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-20' src={assets.earning_icon} alt='' />
          <div>
            <p className='font-semibold text-4xl text-gray-800'>$ {dashData.earnings}</p>
            <p className='text-gray-600'>Earnings</p>
          </div>
        </div>
      </div>

      <div className='bg-white mt-10 w-[60vw]'>
        <div className='flex items-center p-3 gap-3 rounded-t border '>
          <img src={assets.list_icon} alt='' />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
      </div>


      <div className='bg-white mt-1 w-[60vw]' >
        <div className='p-2 border border-t-0 '>
          <div className='hidden w-full sm:grid grid-cols-[2fr_2fr_2fr] gap-3 py-2 text-sm font-semibold border-b-2 '>
            <p className='ml-8'>Doctor</p>
            <p className=''>Date & Time</p>
            <p className=''>Patient</p>

          </div>

          {
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className='flex flex-wrap justify-between w-full sm:grid sm:grid-cols-[2fr_2fr_2fr] max-sm:gap-3 px-2 py-2 text-sm text-gray-600 border-b hover:bg-gray-100 '>
                <div className='flex gap-2 items-center'>
                  <img className='w-10 rounded-full bg-slate-300 object-fill' src={item.docData.image} alt='' />
                  <p>{item.docData.name}</p>
                </div>
                <p className='flex items-center'>{slotDateFormat(item.slotDate)} - {item.slotTime}</p>
                <div className='flex gap-2 items-center'>
                  <div className='border-1 border-gray-400 w-8 h-8 '>
                    <img className='w-[100%] h-[100%] rounded-full object-cover' src={item.userData.image} alt='' />
                  </div>
                  <p>{item.userData.name}</p>
                </div>



              </div>
            ))
          }

        </div>


      </div>
      <div className=''>
        <button onClick={() => { navigate('/all-appointments'), scrollTo(0, 0) }} className='bg-primary px-6 py-1 text-white font-semibold mt-3 rounded'>More</button>
      </div>



    </div>
  )
}

export default Dashboard
