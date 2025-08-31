import React from 'react'
import Login from './pages/Login'
import { useContext } from 'react'
import { Admincontext } from './context/Admincontext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { Doctorcontext } from './context/Doctorcontext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import Filtering from './pages/Admin/Filtering'
import PatientList from './pages/Admin/PatientList'


const App = () => {

  const{adminToken} = useContext(Admincontext)
  const {dtoken} = useContext(Doctorcontext)


  return adminToken || dtoken ? (
    <div className='bg-[#F2F3FF]'>
     <Navbar/>
     <div className='flex items-start'>
     <Sidebar/>

     <Routes>

        {/**------ADMIN ROUTES----------- */}
        {adminToken && <Route path='/' element={<Dashboard/>}/>}
        {adminToken && <Route path='/add-doctor' element={<AddDoctor/>}/>}
        {adminToken &&<Route path='/all-appointments' element={<AllAppointments/>}/>}
        {adminToken && <Route path='/doctor-list' element={<DoctorsList/>}/>}
        {adminToken && <Route path='/filtering' element={<Filtering/>}/>}
        {adminToken && <Route path='/patient-list' element={<PatientList/>}/>} 


         {/**------DOCTOR ROUTES----------- */}
        {dtoken && <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/> }
        {dtoken && <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>}
        {dtoken && <Route path='/doctor-profile' element={<DoctorProfile/>}/>}

        <Route path='/*' element={<p className='text-center m-auto text-4xl'>This resource does not exist</p>}/>
     </Routes>
     </div>
    </div>
  ):(
    <>
    <Routes>
      {/**All these routes created instead of single login component without any <routes></routes> 
       so that login page is displayed for these specific routes only*/}

    <Route path='/' element={<Login/>}/>
    <Route path='/add-doctor' element={<Login/>}/>
    <Route path='/all-appointments' element={<Login/>}/>
    <Route path='/doctor-list' element={<Login/>}/>
    <Route path='/doctor-dashboard' element={<Login/>}/>
    <Route path='/doctor-appointments' element={<Login/>}/>
    <Route path='/doctor-profile' element={<Login/>}/>
   
    {<Route path='*' element={<p className='text-center text-4xl'>404 NOT FOUND</p>}/> }
    </Routes>
    
    </>
  )
}

export default App
