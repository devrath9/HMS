import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useContext } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import { Appcontext } from '../../context/Appcontext'
import Modal from '../../components/Modal'

const DoctorAppointments = () => {

  const { dtoken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(Doctorcontext)
  const { calculateAge, slotDateFormat } = useContext(Appcontext)
  const [modalOpen, setmodalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const handleclose = () => { setmodalOpen(false) }

  useEffect(() => {
    if (dtoken) {
      getAppointments()
    }
  }, [dtoken])


  return dtoken && (
    <div className='w-full max-6xl m-5' >
      <p className='mb-3 font-medium'>Doctor Appointments</p>

      <div className='bg-white rounded text-sm max-h-[90vh] min-h-[40vh] overflow-y-scroll'>
        <div className='hidden md:grid md:grid-cols-[2fr_2fr_2fr] xl:grid-cols-[0.5fr_4fr_2.5fr_2fr_2.5fr_4fr_2fr_2fr] grid-flow-col px-6 py-2 mb-2 border-2 bg-gray-100 font-semibold '>
          <p className='hidden xl:flex '>#</p>
          <p className='hidden md:flex md:ml-4 xl:ml-0 '>Patient</p>
          <p className='hidden xl:flex '>Gender</p>
          <p className='hidden xl:flex xl:ml-2 '>Age</p>
          <p className='hidden xl:flex xl:ml-3 '>Patient Info</p>
          <p className='hidden md:flex md:ml-4 xl:ml-5 ' >Date & Time</p>
          <p className='hidden xl:flex ' >Fees</p>
          <p className='hidden md:flex md:ml-5 xl:ml-3 '>Actions</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between items-center max-md:gap-2 gap-2 md:grid md:grid-cols-[2fr_2fr_2fr] xl:grid-cols-[0.5fr_4fr_2.5fr_2fr_2.5fr_4fr_2fr_2fr] grid-flow-col py-3 px-6 text-gray-600 border-b hover:bg-gray-50'>
            <p className='hidden xl:flex'>{index + 1}</p>

            <div className='flex flex-col max-xl:gap-2 xl:gap-0'>
              <div className='flex gap-2 items-center'>
                <div className='border-1 border-gray-400 w-8 h-8 '>
                  <img className='w-[100%] h-[100%] rounded-full object-cover' src={item.userData.image} alt='' />
                </div>
                <p>{item.userData.name}</p>
              </div>
              <dl>
                <dt className='sr-only'>Patient Info</dt>
                <dd><button onClick={() => { setmodalOpen(true); setModalData(item.userData) }}
                  className='xl:hidden bg-primary h-8 px-1 text-white rounded w-24 text-center'>
                  View details</button>
                </dd>

              </dl>
            </div>

            <p className='hidden xl:flex items-center'>{item.userData.gender}</p>
            <p className='hidden xl:flex items-center'>{calculateAge(item.userData.dob)} yrs</p>

            <button onClick={() => { setmodalOpen(true); setModalData(item.userData) }}
              className='hidden xl:block items-center bg-primary h-8 px-1 text-white rounded w-24 text-center '>View details</button>


            <p className='flex items-center'>{slotDateFormat(item.slotDate)}-{item.slotTime}</p>


            <p className='hidden xl:flex xl:items-center'>${item.docData.fees}</p>

            <div className='flex items-center'>
              {
                item.suspended
                  ? <button className='border border-blue-700 text-blue-700 text-sm px-2 py-1 w-24 h-8 rounded' disabled>Suspended</button>
                  : item.isCompleted
                    ? <button className='border border-green-700 text-green-700 text-sm px-2 py-1 w-24 h-8 rounded' disabled>Completed</button>
                    : item.cancelled
                      ? <button className='border border-red-700 text-red-700 text-sm px-2 py-1 w-24 h-8 rounded' disabled>Cancelled</button>
                      : <div className='flex gap-1 '>
                        <img onClick={() => cancelAppointment(item._id)}
                          className='w-10 h-10 cursor-pointer hover:border-2 rounded-full border-red-500 ' src={assets.cancel_icon} alt='' />

                        <img onClick={() => completeAppointment(item._id)}
                          className='w-10 h-10 cursor-pointer hover:border-2 rounded-full border-green-500 ' src={assets.tick_icon} alt='' />

                      </div>
              }
            </div>

          </div>
        ))}


      </div>
      {modalOpen && <Modal onClose={handleclose} patientProfile={modalData} />}
    </div>
  )
}

export default DoctorAppointments
