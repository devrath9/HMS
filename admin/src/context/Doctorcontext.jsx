import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const Doctorcontext =  createContext()

const DoctorcontextProvider=(props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dtoken, setDtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashdata] = useState(false)
    const [profileData, setProfiledata] = useState(false)

    const getAppointments = async()=>{

        try{
        
        const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {headers: {dtoken} })
        if(data.success){
        setAppointments(data.appointments)
        console.log(data.appointments);
        
        }
        else{
            toast.error(data.message)
        }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeAppointment = async(appointmentId)=>{
        try{

            const {data} = await axios.post(backendUrl +'/api/doctor/complete-appointment',{appointmentId}, {headers:{dtoken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const cancelAppointment = async(appointmentId)=>{
        try{

            const {data} = await axios.post(backendUrl +'/api/doctor/cancel-appointment',{appointmentId}, {headers:{dtoken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
            }
            else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const getDashdata = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers:{dtoken}})
            if(data.success){
                setDashdata(data.docDashdata)
                console.log(data.docDashdata)
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }

    }

    
    const getProfileData = async()=>{
        try{

            const{data} = await axios.get(backendUrl + '/api/doctor/doctor-profile', {headers:{dtoken}})

            if(data.success){
                setProfiledata(data.profileData)
                console.log(data.profileData)
            }
            else{
               toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    

    const value={
        backendUrl,
        dtoken, setDtoken, 
        appointments, setAppointments, getAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashdata, getDashdata,
        profileData, setProfiledata, getProfileData
        
    }

    return(
    <Doctorcontext.Provider value={value}>
        {props.children}
    </Doctorcontext.Provider>
    )
    
}
export default DoctorcontextProvider