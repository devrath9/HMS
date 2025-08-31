import React ,{useState, useContext} from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { Admincontext } from '../../context/Admincontext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const{adminToken, backendUrl} = useContext(Admincontext)

  const[docimg, setDocimg] = useState(false)
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[experience, setExperience] = useState('1 Year')
  const[fees, setFees] = useState('')
  const[speciality, setSpeciality] = useState('General Physician')
  const[degree, setDegree] = useState('')
  const[address1, setAddress1] = useState('')
  const[address2, setAddress2] = useState('')
  const[about, setAbout] = useState('')

  const onSubmitHandler= async(e)=>{
    e.preventDefault()

   try{

    const formdata = new FormData()
    formdata.append('image', docimg)
    formdata.append('name', name)
    formdata.append('email', email)
    formdata.append('password', password)
    formdata.append('experience', experience)
    formdata.append('fees', Number(fees))
    formdata.append('speciality', speciality)
    formdata.append('degree', degree)
    formdata.append('address', JSON.stringify({line1:address1, line2:address2}))
    formdata.append('about', about)

    //consoling result
    // formdata.forEach((value, key)=>{
    //   console.log(`${key} : ${value}`);
      
    // })

     const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formdata, {headers :{adminToken}} )
     if(data.success){
      toast.success(data.message)
      setDocimg(false)
      setName('')
      setEmail('')
      setPassword('')
      setSpeciality('General Physician')
      setExperience('1 Year')
      setFees('')
      setAddress1('')
      setAddress2('')
      setAbout('')
     }
     else{
      toast.error(data.message)
     }

    
   }catch(error){
    console.log(error.message)
    toast.error('Internal Server Error Occured')
   }





  }


  return (
    <form onSubmit={onSubmitHandler} className='m-4 w-full'>
      <p>Add Doctor</p>
      <div className='bg-white px-8 py-6 w-full border border-gray-100 rounded-lg mt-3 max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-2 text-gray-600'>
          <label htmlFor='doc-img'>
            <img className='w-16 bg-white rounded-full cursor-pointer'src={docimg ? URL.createObjectURL(docimg):assets.upload_area} alt='' />
          </label>
          <input onChange={(e)=>setDocimg(e.target.files[0])} type='file' id='doc-img' hidden />
          <p >Upload Doctor <br />Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-10 mt-6'>

          {/*------------------------------left side---------------------------------- */}

          <div className='w-full flex flex-col gap-4'>
            <div className='w-full flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' id='doc-name' placeholder='Name' required />
            </div>

            <div className='w-full flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type='text' id='doc-email' placeholder='Email' required />
            </div>

            <div className='w-full flex flex-col gap-1'>
              <p>Set Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type='text' id='doc-pass' placeholder='Password' required />
            </div>

            <div className='w-full flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience}className='border rounded px-3 py-2' name=" " id=" ">
                <option value='1 Year'> 1 Year</option>
                <option value='2 Years'> 2 Years</option>
                <option value='3 Years'> 3 Years</option>
                <option value='4 Years'> 4 Years</option>
                <option value='5 Years'> 5 Years</option>
                <option value='6 Years'> 6 Years</option>
                <option value='7 Years'> 7 Years</option>
                <option value='8 Years'> 8 Years</option>
                <option value='9 Years'> 9 Years</option>
                <option value='10 Years'> 10 Years</option>
                <option value='10+ Years'> 10+ Years</option>

              </select>
            </div>

            <div className='w-full flex flex-col gap-1'>
              <p>Doctor Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' id='doc-fees' placeholder='Fees' required />
            </div>


          </div>

          {/*---------------------------right side--------------------------------- */}

          <div className='w-full flex flex-col gap-4'>

            <div className='w-full flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name='' id=''>
                <option value='General Physician'>General Physician</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatrician'>Pediatrician</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
              </select>
            </div>

            <div className='w-full flex flex-col gap-1'>
              <p>Degree</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type='text' id='doc-degree' placeholder='Degree' required />
            </div>

            <div className='w-full flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type='text' id='' placeholder='Address Line 1' required />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type='text' id='' placeholder='Address Line 2' required />
            </div>

          </div>


        </div>

        {/** -----------------BOTTOM SECTION-------------------- */}
        <div className='w-full flex flex-col gap-2 mt-3'>
          <p>About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='px-4 pt-2 border rounded' rows={5} placeholder='About' required />
        </div>

        <button type='submit' className='bg-primary px-10 py-2 text-white mt-6 border rounded-full'>Add Doctor</button>



      </div>


    </form>
  )
}

export default AddDoctor
