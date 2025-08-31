import React from 'react'

const Modal = ({ onClose, patientProfile }) => {
    return (
        <div onClick={onClose} className='fixed inset-0 visible bg-black/30 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='w-2/3  rounded bg-white flex flex-col gap-1 justify-center px-4 py-3 items-center '>
                <div className='border-2 rounded-full border-gray-500 w-28 h-28 '>
                  <img className='w-[100%] h-[100%] rounded-full object-cover' src={patientProfile.image} alt='' /> 
                </div>
                <div className='flex flex-col items-center '>
                    <p className='text-xl mt-2 font-medium '>{patientProfile.name}</p>
                    <p className='text-blue-500'>{patientProfile.email}</p>
                </div>

                <div className='flex flex-col md:grid grid-cols-[2fr_3.5fr] gap-3 items-center justify-center mt-8'>
                    <div className='flex flex-col gap-2 items-center '>
                    <p className='text-gray-600 font-medium'>BASIC INFORMATION</p>
                    <div className='flex sm:flex-row md:flex-col lg:flex-row gap-8 mt-2 border-2 rounded  p-4'>
                        <p className=''>Gender <br/><span className='font-bold'>{patientProfile.gender}</span></p>
                        <p>Date of Birth <br/><span  className='font-bold'> {patientProfile.dob} </span></p>
                    </div>
                    </div>
                    
                    <div className='flex flex-col items-center gap-2'>
                    <p className='text-gray-600 font-medium'>CONTACT INFORMATION</p>
                    <div className='flex sm:flex-row md:flex-col lg:flex-row gap-6 mt-2 border-2 rounded p-4'>
                        <p>Phone <br/> <span  className='font-bold'>{patientProfile.phone}</span></p>
                        <p>Address <br/> <span  className='font-bold'>{patientProfile.address.line1},{patientProfile.address.line2}</span></p>
                    </div>
                    </div>

                </div>


                <button onClick={onClose} className='m-auto mb-2 mt-5 px-3 py-1 rounded bg-primary text-white'>Close</button>

            </div>

        </div>
    )
}

export default Modal
