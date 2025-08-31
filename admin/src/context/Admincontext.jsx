import { createContext, useState, useEffect} from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const Admincontext = createContext()

const AdmincontextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [patients, setPatients] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAlldoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { adminToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)

            }
            else {
                toast.error(data.message)
            }
        } catch (error) {

            toast.error(error.message)
        }


    }


    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { adminToken } })
            if (data.success) {
                toast.success(data.message)
                getAlldoctors()
            }
            else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    const getAllappointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { adminToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getAllpatients = async(patientName)=>{
        try{

            const {data} = await axios.post(backendUrl +'/api/admin/getAllPatients', {patientName},  { headers: { adminToken } })
            if(data.success){
                setPatients(data.regPatients)
                console.log(data.regPatients)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { adminToken } })
            if (data.success) {
                toast.success(data.message)
                // getAllappointments()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    const makeCashPayment = async(appointmentId)=>{
        try{

            const {data} = await axios.post(backendUrl +'/api/admin/cash-payment', {appointmentId}, { headers: { adminToken }} )
            if(data.success){
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

    const getDashData = async()=>{

        try{

            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { adminToken } } )
            if(data.success){
               setDashData(data.dashData)
               console.log(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    

    const value = {
        adminToken, setAdminToken,
        backendUrl, getAlldoctors, doctors,
        changeAvailability,
        appointments, setAppointments, getAllappointments,
        patients, getAllpatients, 
        cancelAppointment,
        makeCashPayment,
        dashData, getDashData
    }

    return (
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )

}
export default AdmincontextProvider