import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <p className='text-2xl mt-8 mb-12 text-center '>CONTACT US</p>
      <div className='flex flex-col md:flex-row gap-6 m-auto items-center justify-center  '>
        <img className='w-96'src={assets.contact_image} alt=''/>
        <div className='flex flex-col gap-5 px-4 mt-2'>
          <p className='text-xl font-semibold text-gray-600'>OUR OFFICE</p>
          <p className='flex flex-col text-gray-500 text-sm'>
            <span>00000 Willms Station</span>
            <span>Suite 000, Washington, USA</span>
          </p>
          <p className='flex flex-col text-gray-500 text-sm'>
            <span>Tel: (000) 000-0000</span>
            <span>Email: anirudhhms@gmail.com</span>
          </p>
          <p className='text-lg font-semibold text-gray-600'>CAREERS AT PRESCRIPTO</p>

          <p>Learn more about our teams and job openings.</p>

          <button className='border border-gray-400 px-6 py-3 max-w-48 text-sm hover:bg-primary hover:text-white'>EXPLORE JOBS</button>

        </div>
      </div>
    </div>
  )
}

export default Contact
