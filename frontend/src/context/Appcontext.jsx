import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from "react-toastify";

export const Appcontext = createContext()

const AppcontextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const[userData, setUserData] = useState(false)
    const[appointments, setAppointments] = useState([])
    const[token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    

    const getDoctorsData = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                console.log(data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async()=>{
        try{

        const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})
        if(data.success){
            setUserData(data.userdata)
            toast.success(data.message)
        }
        else{
            toast.error(data.message)
        }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }



    const getUserAppointments = async()=>{
        try{
    
          const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}} )
          if(data.success){
            setAppointments(data.appointments.reverse())
            console.log(data.appointments);
            
          }
        }catch(error){
          console.log(error)
          toast.error(error.message)
        }
      }


      const cancelAppointment = async(appointmentId)=>{

        try{
    
          const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})
          if(data.success){
            toast.success(data.message)
            getUserAppointments()
            getDoctorsData()         //so that slot freed after cancellation can be seen without reloading on doctor page
          }
          else{
              toast.error(data.message)
          }
         
         
          }catch(error){
          console.log(error)
          toast.error(error.message)
        }
      }  


    const payOnline = async(appointmentId)=>{
        try{
    
            const {data} = await axios.post(backendUrl + '/api/user/pay-Online', {appointmentId}, {headers:{token}})
            if(data.success){
              toast.success(data.message)
              getUserAppointments()
             
            }
            else{
                toast.error(data.message)
            }
           
           
            }catch(error){
            console.log(error)
            toast.error(error.message)
          }
    }  

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }

    },[token])



    const value = {
        doctors, 
        backendUrl, 
        token, setToken,
        userData, setUserData,
        getDoctorsData,
        getUserAppointments,appointments,
        cancelAppointment,
        payOnline,
        loadUserProfileData
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )

}
export default AppcontextProvider