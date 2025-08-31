import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 mb-10 text-sm '>
        {/*-------------LEFT----------------------- */}
        <div>
            <img className='mb-5 w-40'src={assets.logo} alt=''/>
            <p className='w-full md:w-2/3 text-gray-600 text-sm leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt architecto quis ex repellat eos aliquam, quaerat temporibus eligendi perspiciatis deleniti illo nam corrupti soluta.
            </p>
        </div>



      {/*-------------CENTER----------------------- */}
        <div>
            <p className='text-xl font-medium mb-3'>COMPANY</p>

            <ul className='flex flex-col gap-3 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>



      {/*-------------RIGHT----------------------- */}

        <div>
            <p className='text-xl font-medium mb-3'>GET IN TOUCH</p>

            <ul className='flex flex-col gap-3 text-gray-600'>
                <li>+0-000-000-000</li>
                <li>anirudhHMS@gmail.com</li>
               
            </ul>
        </div>

     
      
    </div>

    <div>
        <hr/>
        <p className='text-center text-sm py-4 '>Copyright 2024 @ ANIRUDHHMS- All Right Reserved</p>
    </div>

           
    </>

    

    
  )
}

export default Footer
