import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import { Doctorcontext } from '../../context/Doctorcontext'

const DoctorProfile = () => {

  const { dtoken, profileData, setProfiledata, getProfileData, backendUrl } = useContext(Doctorcontext)
  const [isEdit, setIsEdit] = useState(false)



  const updateDocProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-doctorProfile', updateData, { headers: { dtoken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData()
    }
  }, [dtoken])

  return profileData && (
    <div>
      <p className='hidden max-lg:block ml-6 mt-2 font-medium '>Profile details</p>
      <div className='w-full max-h-[90vh] overflow-y-scroll'>
        <div className='flex flex-col gap-4 m-5'>
          <div>
            <img className='bg-primary/80 w-full sm:max-w-64 rounded' src={profileData.image} alt='' />
          </div>

          <div className='flex-1 gap-2 border border-stone-100 rounded p-6 py-6 bg-white'>
            {/**Doctor Info - name, fees, degree, experience, availability, about */}

            <p className='text-3xl text-gray-800 font-medium'>{profileData.name}</p>

            <div className='flex items-center gap-3 mt-1'>
              <p>{profileData.degree} - {profileData.speciality}</p>
              <button className='bg-primary/25 px-2 py-0.5 max-sm:w-20 rounded-lg font-medium'>{profileData.experience}</button>
            </div>




            <div className='max-sm:mt-6 mt-4 flex flex-col '>
              <p className='font-medium '>About:</p>
              <p className='text-gray-600 mt-1'>{profileData.about}</p>
            </div>

            <p className='mt-5 font-medium text-black'>Appointment fees :
              <span className='text-gray-600 font-normal'>$
                {isEdit
                  ? <input className=' bg-gray-200 font-medium p-1 border border-black max-w-32 rounded ml-1 text-black'
                    type='number' onChange={(e) => setProfiledata(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} />
                  : profileData.fees
                }
              </span></p>

            <div className='flex gap-2 mt-5'>
              <p className='font-medium'>Address:</p>
              <p className='text-gray-600'>
                {isEdit
                  ? <input className=' bg-gray-200 font-medium p-1 border border-black max-w-72 rounded ml-1 mb-1 text-black'
                    type='text' onChange={(e) => setProfiledata(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                  : profileData.address.line1}
                <br />
                {isEdit
                  ? <input className=' bg-gray-200 font-medium p-1 border border-black max-w-72 rounded ml-1 text-black'
                    type='text' onChange={(e) => setProfiledata(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                  : profileData.address.line2}
              </p>
            </div>

            <div className='flex gap-3 mt-2'>

              <label htmlFor='' className='font-medium'>Available</label>
              <input type='checkbox' onChange={(e) => { isEdit && setProfiledata(prev => ({ ...prev, available: !prev.available })) }}
                checked={profileData.available} name='' id='' />
            </div>

            <div className='flex justify-center mt-4'>
              {isEdit
                ? <button onClick={updateDocProfile}
                  className='bg-primary text-white w-36 py-2 rounded-full'>Save Changes
                </button>
                : <button onClick={() => setIsEdit(true)}
                  className='bg-primary text-white w-32 py-2 rounded-full'>Edit Profile
                </button>}
            </div>



          </div>
        </div>

      </div>
    </div>
  )
}

export default DoctorProfile
