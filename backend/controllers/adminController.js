import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import apppointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'



//API FOR ADDING DOCTOR
const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imagefile = req.file

        //checking whether all fields are passed
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Field details" })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //encrypting password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {

            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()

        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: "New Doctor added" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}


//API FOR ADMIN LOGIN

const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const adminToken = jwt.sign(email, process.env.JWT_SECRET)
            res.json({ success: true, token: adminToken })

        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api for getting all doctors

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for getting all appointments list

const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await apppointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for getting all registered patient list

const registeredPatients = async(req, res)=>{
    try{

        const {patientName} = req.body
        let query={}

        if(patientName){
        query['name']={$regex: patientName, $options: "i"}
        }


        const regPatients = await userModel.find(query)
        res.json({success:true, regPatients})

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//function to convert slot date to alphabetical format
const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('-')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]

    }


//api for filtering appointment data for admin based on search and dropdown in frontend

const appointmentsFiltered = async(req, res)=>{
    try{

      const {patientName, doctorName, appointStatus, filterdate} = req.body

      let query={}
      if(patientName){
        query['userData.name']={$regex: patientName, $options: "i"}
      }

      if(doctorName){
        query['docData.name'] = {$regex:doctorName, $options:"i"}
      }

      if(filterdate){
        query['slotDate'] = {$regex:filterdate, $options:"i"}         
      }

      if (appointStatus) {
        if (appointStatus === "Completed") {
            query.isCompleted = true; // Filter for completed appointments
        } else if (appointStatus=== "Upcoming") {
            query.isCompleted = false; // Filter for incomplete or upcoming appointments
            query.cancelled=false;
            query.suspended=false;
        }
        // else if(appointStatus==='Others'){
        //     query = {
        //         ...query, // Keep other filters (like doctorName, patientName)
        //         $or: [
        //             { cancelled: true }, // Match if cancelled is true
        //             { suspended: true }  // Match if suspended is true
        //         ]
        //     };
        // }
    }

      const filteredAppts = await appointmentModel.find(query)
      res.json({success:true, filteredAppts})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api for appointment cancellation

const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await apppointmentModel.findById(appointmentId)

        await apppointmentModel.findByIdAndUpdate(appointmentId, { suspended: true })

        const { docID, slotDate, slotTime } = appointmentData
        const docData = await doctorModel.findById(docID)
        let slots_booked = docData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => { e !== slotTime })
        await doctorModel.findByIdAndUpdate(docID, { slots_booked })

        res.json({ success: true, message: 'Appointment Suspended' })



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}




//api for cash payment from admin side
const cashPayment= async(req, res)=>{
    try{

        const {appointmentId} = req.body
       
         await appointmentModel.findByIdAndUpdate(appointmentId, {paymentCash:true})

        res.json({success:true, message:'Cash Payment Complete'})

    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }
}





//api for deleting cancelled AND suspended appointments from records

const deleteCancelled = async (req, res) => {

    try {

        const deletedAppointments = await apppointmentModel.countDocuments({ cancelled:true, suspended: true })
        if (deletedAppointments===0) {
            return res.json({ success: false, message: "Records already deleted!!" })
        }
        else {
            await apppointmentModel.deleteMany({cancelled:true, suspended: true })
            res.json({ success: true, message: "Records Deleted !!" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


//api to get DASHBOARD DATA for admin panel

const adminDashBoard= async(req, res)=>{

    try{

        const patients = await userModel.find({})
        const appointments = await apppointmentModel.find({cancelled:false})
        const allAppointments = await apppointmentModel.find({})
        const doctors = await doctorModel.find({})

        let earnings=0
        allAppointments.map((item)=>{
            if(item.isCompleted || item.paymentOnline ||item.paymentCash ){
                earnings += item.amount  
            }
        })


        const dashData = {
            patients: patients.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,8),
            doctors:doctors.length,
            earnings: earnings
         }

         res.json({success:true, dashData})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }

}



export { addDoctor, adminLogin, allDoctors, appointmentsAdmin, appointmentsFiltered, appointmentCancel, 
        deleteCancelled, cashPayment, adminDashBoard, registeredPatients}