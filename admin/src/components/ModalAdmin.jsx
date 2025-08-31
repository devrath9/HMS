import React from 'react'

const ModalAdmin = ({onClose, patientInfo}) => {
  return (
    <div onClick={onClose}className='fixed inset-0 bg-black/30 flex items-center justify-center '>
        <div onClick={e=>e.stopPropagation()} className='max-xl:w-3/4 w-1/2 flex flex-col justify-center items-center border-[1.5px] rounded-lg bg-gray-50'>
                <div className='flex flex-col items-center '>
                    <p className='text-xl mt-2 font-medium '>{patientInfo.name}</p>
                    <p className='text-blue-500'>{patientInfo.email}</p>
                </div>

                <div className='flex flex-col md:flex-row gap-3 items-center justify-center mt-8 p-2'>
                    <div className='flex flex-col gap-2 items-center '>
                    <p className='text-gray-600 font-medium'>BASIC INFORMATION</p>
                    <div className='flex sm:flex-row md:flex-col lg:flex-row gap-8 mt-2 border-[3px] rounded  p-4'>
                        <p className=''>Gender <br/><span className='font-bold'>{patientInfo.gender}</span></p>
                        <p>Date of Birth <br/><span  className='font-bold'> {patientInfo.dob} </span></p>
                    </div>
                    </div>
                    
                    <div className='flex flex-col items-center gap-2 p-2'>
                    <p className='text-gray-600 font-medium'>CONTACT INFORMATION</p>
                    <div className='flex sm:flex-row md:flex-col lg:flex-row gap-6 mt-2 border-[3px] rounded p-4'>
                        <p>Phone <br/> <span  className='font-bold'>{patientInfo.phone}</span></p>
                        <p>Address <br/> <span  className='font-bold'>{patientInfo.address.line1},{patientInfo.address.line2}</span></p>
                    </div>
                    </div>
                </div>    
              

            <button onClick={onClose}
            className='mt-4 w-32 bg-primary px-2 py-1 font-semibold rounded text-white mb-3'>Close</button>
                
        </div>
      
    </div>
  )
}

export default ModalAdmin
