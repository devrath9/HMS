import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'


//api to change doctor availability
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to see all added doctors
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for doctor login

const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body

        //checking if email/doctor exists
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: 'This doctor is not registered' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch){

            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//api to get appointments of a particular doctor

const appointmentsDoctor = async(req, res)=>{

    try{

        const {docID} = req.body
        const appointments = await appointmentModel.find({docID})

        res.json({success:true, appointments})

        
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to mark appointment complete in doctor panel

const appointmentComplete = async(req, res)=>{
    try{
        
        const { docID, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docID === docID){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted : true})
            return res.json({success:true, message:'Appointment Completed'})
        }
        else{
            return res.json({success:false, message:'Action Failed! Unauthorised Action'})
        }

        
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//api to mark appointment suspended in doctor panel

const appointmentCancel = async(req, res)=>{
    try{
        
        const { docID, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docID === docID){
            await appointmentModel.findByIdAndUpdate(appointmentId, {suspended : true})
            return res.json({success:true, message:'Appointment Suspended'})
        }
        else{
            return res.json({success:false, message:'Action Failed! Unauthorised Action'})
        }

        
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get dashboard data for doctor panel

const doctorDashboard = async(req, res)=>{
    try{
         const {docID} = req.body
        const appointments = await appointmentModel.find({docID})
        const upcomingAppointments = await appointmentModel.find({docID, cancelled:false, isCompleted:false, suspended:false})

        let earnings = 0
            appointments.map((item)=>{
            if(item.isCompleted || item.payment ){
                earnings += item.amount  
            }
        })
          
        let patients=[]
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
               patients.push(item.userId)
            }
        })

        const docDashdata ={

            earnings : earnings,
            appointments: appointments.length,
            patients : patients.length,
            latestAppointments : upcomingAppointments.reverse().slice(0,5),

        }

        res.json({success:true, docDashdata})



    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get doctor profile for doctor panel

const doctorProfile = async(req,res)=>{
    try{

        const {docID} = req.body
        const profileData = await doctorModel.findById(docID).select('-password')
        res.json({success:true, profileData})

        
    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to update doctor profile data from doctor panel
 const updateDoctorProfile = async(req, res)=>{
    try{

        const {docID, fees, address,available} = req.body

        await doctorModel.findByIdAndUpdate(docID, {fees, address, available})
        res.json({success:true, message: 'Profile Updated'})

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
 }



export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor,
           appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile}