import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div className='mt-12'>
      <p className='text-2xl text-center'>ABOUT US</p>
      <div className='flex flex-col items-center md:flex-row gap-10 mt-5 '>
        <img className='w-96' src={assets.about_image} alt='' />
        <div className='flex flex-col gap-4 text-sm text-gray-500'>
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand
            the challenges individuals face when it comes to scheduling doctor appointments
            and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology.
            We continuously strive to enhance our platform,
            integrating the latest advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care,
            Prescripto is here to support you every step of the way.
          </p>
          <p className='text-lg text-black font-semibold'>Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user.
            We aim to bridge the gap between patients and healthcare providers,
            making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      <div className='mt-16'>
        <p className='text-2xl font-semibold text-blue-bg-blue-500'>WHY CHOOSE US</p>
        <div className='flex flex-col md:flex-row gap-2 mt-6'>
        <div className='bg-blue-600 text-white rounded-lg flex flex-col gap-5 py-14 px-10 md:px-16 items-center'>
          <p className='text-2xl font-semibold'>Efficiency</p>
          <p className='md:max-w-64'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='bg-blue-600 text-white rounded-lg flex flex-col gap-5  py-14 px-10 md:px-16 items-center'>
        <p className='text-2xl font-semibold'>Convenience</p>
        <p className='md:max-w-64'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='bg-blue-600 text-white rounded-lg flex flex-col gap-5 py-14 px-10 md:px-16 items-center'>
        <p className='text-2xl font-semibold'>Personalisation</p>
        <p className='md:max-w-64'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default About
