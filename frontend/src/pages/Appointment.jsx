import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { docID } = useParams()
  const { doctors, backendUrl, token, getDoctorsData } = useContext(Appcontext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find(doc => doc._id === docID)
    setDocInfo(docInfo)
    // console.log(docInfo)

  }

  const getAvailableSlots = () => {

    setDocSlots([])

    let today = new Date()
    for (let i = 0; i < 7; i++) {
      //getting date with index

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(19, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() >= 10 ? (currentDate.getHours() + 1) : 10)
        currentDate.setMinutes(currentDate.getMinutes() >= 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        //add slot to array irrespective of available/unavailable
        // timeSlots.push({
        //   datetime: new Date(currentDate),
        //   time: formattedTime
        // })



        let day = currentDate.getDate()
        let month = months[currentDate.getMonth() + 1]
        let year = currentDate.getFullYear()
        const sDate = day + "-" + month + "-" + year     //formatting date to match format in database for comparing
        
        const sTime = formattedTime

        //This checks which slots are available from docinfo.slots_booked object
        const isSlotAvailable = docInfo.slots_booked[sDate] && docInfo.slots_booked[sDate].includes(sTime) ? false : true
        if (isSlotAvailable) {

          //add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

          //this will display only available slots
        }




        //increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }

  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please Login to book appointment')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = months[date.getMonth() + 1]
      let year = date.getFullYear()
      let slotDate = day + "-" + month + "-" + year
      console.log(slotDate)

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docID, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success('Appointment booked')
        getDoctorsData()                       //so that slots gets updated
        navigate('/my-appointments')
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
    fetchDocInfo()

  }, [doctors, docID])


  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }

  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])



  return docInfo && (
    <div>
      <div className='flex flex-col md:flex-row gap-3'>
        {/*----------------Doctor Image-------------------- */}
        <div className='p-1'>
          <img className='w-full bg-primary rounded-lg ' src={docInfo.image} alt='' />
        </div>



        {/*-------------Doctor Info----------- -------------*/}
        <div className='w-full border border-gray-300 pl-8 pt-8 pr-5 pb-4 rounded-lg flex flex-col gap-3 mt-1'>
          <div className='flex flex-row gap-2'>
            <p className='text-3xl text-gray-700'>{docInfo.name} </p>
            <img className='max-w-5' src={assets.verified_icon} alt='' />
          </div>


          <div className='flex flex-row gap-3'>
            <p className='text-gray-600'>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='border border-gray-300 bg-blue-200 rounded-lg px-2 py-0.5 text-black text-sm'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex flex-row gap-2 font-sm'>About <img src={assets.info_icon} alt='' /></p>
            <p className='text-gray-600 text-sm mt-3 max-w-[700px]'>{docInfo.about}</p>
          </div>


          <p>Appointment fee : ${docInfo.fees}</p>

        </div>


      </div>


      {/*-----------------BOOKING SLOTS------------------- */}
      <div className=' flex flex-col sm:pl-7 text-gray font-medium p-5 border border-gray mt-4 bg-slate-100 rounded-xl'>
        <p className='text-xl font-normal mb-5 text-center'>Booking Slots</p>

        <div className='flex flex-wrap justify-center gap-4 mt-3 w-full'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div key={index} onClick={() => { setSlotIndex(index) }}
                className={`text-center border-2 border-gray-400 min-w-14 py-4 rounded-3xl cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray'}`}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex flex-wrap  justify-center gap-3 mt-4 '>
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <div key={index} onClick={() => { setSlotTime(item.time) }}
                className={` text-center text-sm font-normal border border-gray-300 min-w-24 py-2 rounded-xl cursor-pointer  ${slotTime === item.time ? 'bg-primary text-white' : 'border border-gray'}`}>
                <p>{item.time.toLowerCase()}</p>

              </div>
            ))
          }
        </div>
        <div className='text-center mt-8 mb-5'>
          <button onClick={bookAppointment} className='bg-primary px-10 py-3 rounded-full text-white text-md'>Book Appointment</button>
        </div>





      </div>

      <div className='flex flex-col gap-6 mt-10'>
        <p className='text-3xl text-center font-normal'>Related Doctors</p>
        <p className='text-sm text-center font-normal'>Simply browse through our extensive list of trusted doctors.</p>
        <RelatedDoctors speciality={docInfo.speciality} docID={docID} />
      </div>






    </div>
  )
}

export default Appointment
