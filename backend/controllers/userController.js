import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'


//api to register user

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Fields!! Please fill complete details" })
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

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, message: "User registered sucessfully!!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}



//api for user login

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'This user does not exist' })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if (matchPassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//api to get user info - MY PROFILE SECTION

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body

        const userdata = await userModel.findById(userId).select('-password')
        res.json({ success: true, userdata })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to update user profile 

const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, gender, dob } = req.body
        const imagefile = req.file

        if (!name || !phone || !address || !gender || !dob) {
            return res.json({ success: false, message: 'Missing details!! Fill all the values' })
        }

        // Regex to validate 10-digit mobile number starting with 6-9
          const mobileRegex = /^[6-9][0-9]{9}$/;

        if(!mobileRegex.test(phone)){
            return res.json({ success: false, message: 'Invalid Phone Number' }) 
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), gender, dob })

        if (imagefile) {

            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })

           }

        res.json({ success: true, message: "Profile Updated" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}



//api to book appointment

const bookAppointment = async (req, res) => {
    try {

        const { userId, docID, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docID).select('-password')
        const userData = await userModel.findById(userId).select('-password')
        

         const { phone, address, dob, gender} = userData
        
         if(phone==="0000000000" ||address.line1===''||address.line2==="" ||dob==="NOT SELECTED" ||gender==="NOT SELECTED"){
             return res.json({ success: false, message: 'Complete your profile details to book appointment' })
         }

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor is not available' })

        }

        let slots_booked = docData.slots_booked

        if (slots_booked[slotDate]) {                              //if slots_booked array contains the date
            if (slots_booked[slotDate].includes(slotTime))
                return res.json({ success: false, message: 'Slot Unavailable' })
            else {
                slots_booked[slotDate].push(slotTime)
            }
        }
        else {                                                 //if slots do not contain date then we create a slot date array
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)            //then push slotTime into that slotDate array

        }

        delete docData.slots_booked                 //delete history of appointments from appointmodel docdata object

       
        const appointmentData = {
            userId, docID,
            docData,
            userData,
            slotDate, slotTime,
            amount: docData.fees,
            date: Date.now()

        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //updating new slots for doctor in doctorModel
        await doctorModel.findByIdAndUpdate(docID, { slots_booked })

        res.json({ success: 'true', message: 'Appointment Booked' })





    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get appointment list for frontend- myappointments page

const appointmentList = async (req, res) => {
    try {

        const { userId } = req.body

        const appointments = await appointmentModel.find({ userId })
        res.json({ success: 'true', appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to cancel appointment

const cancelAppointment = async (req, res) => {

    try {

        const { appointmentId, userId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify user by comparing userId from appointmentData and userId from req.body
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorised Action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //then we have to free that cancelled slot
        const { docID, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docID)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)     //using slotTime from cancelled appointment to refresh doctor slots_booked

        await doctorModel.findByIdAndUpdate(docID, { slots_booked })        //updating doctor data with updated slots
        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}


//api to make online payment 
 const payOnline = async(req, res)=>{
    try{

        const {appointmentId} = req.body

        await appointmentModel.findByIdAndUpdate(appointmentId,{paymentOnline:true})

        res.json({success:true, message:'Online Payment Sucessful'})

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
 }






export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, appointmentList, cancelAppointment, payOnline }