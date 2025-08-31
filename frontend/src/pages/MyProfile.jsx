import React, { useContext } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Appcontext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const MyProfile = () => {

  const {userData, setUserData, token, setToken, backendUrl, loadUserProfileData} = useContext(Appcontext)

  const [isEdit, setIsEdit] = useState(false)
  const[image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateProfile = async()=>{
      
    setLoading(true)
    try{

    const formdata = new FormData()
    formdata.append('name', userData.name)
    formdata.append('phone', userData.phone)
    formdata.append('dob', userData.dob)
    formdata.append('gender', userData.gender)
    formdata.append('address', JSON.stringify(userData.address))

    image && formdata.append('image', image)

    const {data} = await axios.post(backendUrl +'/api/user/update-profile', formdata, {headers:{token}})
    if(data.success){
      toast.success(data.message)
      await loadUserProfileData()
      setIsEdit(false)
      setImage(false)
     }
    else{
        toast.error(data.message)
    }
  }catch(error){
    console.log(error)
    toast.error(error.message)
  }finally{
    setLoading(false)
  }


  }

 






  return userData && (
    <div className='max-w-lg flex flex-col gap-2 '>

    {
      isEdit
      ? <label htmlFor='image'>
        <div className='inline-block cursor-pointer relative'>
          <img className='w-40 opacity-80' src={image ? URL.createObjectURL(image) : userData.image} alt=''/>
          <img className='absolute bottom-8 right-8 'src={image ? '': assets.upload_icon} alt=''/>
        </div>
        <input type='file'  onChange={(e)=>setImage(e.target.files[0])} id='image' hidden/>
      </label>
      :<img className='w-36' src={userData.image} alt='' />
    }
      

      {
        isEdit ?
          <input className=' bg-gray-300 text-2xl mt-3 font-medium px-1 border border-black max-w-60' 
          type='text' onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
          :<p className='text-3xl font-medium mt-3 '>{userData.name}</p>
      }
      <hr className='h-[2px] bg-zinc-400' />

      <div>
        <p className='text-neutral-500 underline mt-3 font-medium'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-2'>
          <p  className='text-neutral-600'>Email ID: </p>
          <p className='text-blue-500'>{userData.email}</p>
          <p  className='text-neutral-600'>Phone:</p>
          {
            isEdit ?
              <input  className=' bg-gray-300  font-medium p-1  border border-black max-w-52'
               type='text' onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
              : <p>{userData.phone}</p>
          }

          <p  className='text-neutral-600'>Address:</p>
          {
            isEdit ?
              <p>
                <input className=' bg-gray-300  font-medium p-1  border border-black mb-1'
                type='text' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                <br />
                <input className=' bg-gray-300  font-medium p-1  border border-black'
                type='text' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
              </p> :

              <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }


        </div>

      </div>

      <div>
        <p className='text-neutral-500 underline mt-3 font-medium'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-2'>
        <p  className='text-neutral-600'>Gender: </p>

        {
          isEdit
            ? <select className=' bg-gray-300  font-medium p-1  border border-black max-w-40'
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
              <option value=''>NOT SELECTED</option>    
              <option value='MALE'>MALE</option>
              <option value='FEMALE'>FEMALE</option>
            </select>

            :<p>{userData.gender}</p>
        }

        <p  className='text-neutral-600'>Date of Birth:</p>
        {
          isEdit
            ? <input className=' bg-gray-300  font-medium p-1  border border-black max-w-52'
               type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
            : <p>{userData.dob}</p>
        }
        </div>
      </div>

      <div>
        {
          isEdit
            ? <button className='bg-primary px-6 py-3 text-white rounded-full mt-3' onClick={updateProfile}>Save Information</button>
            : <button className='bg-primary px-6 py-3 text-white rounded-full mt-3'onClick={() => setIsEdit(true)}>Edit details</button>
        }
      </div>






     {loading && <Loader/>}
    </div>
  )
}

export default MyProfile
