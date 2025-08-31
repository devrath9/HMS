import mongoose from 'mongoose'
const appointmentSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    docID: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    docData: { type: Object, required: true },
    userData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    suspended: {type :Boolean, default : false},
    paymentOnline: { type: Boolean, default: false },
    paymentCash:{type: Boolean, default: false},
    isCompleted: { type: Boolean, default: false }

})

const appointmentModel = mongoose.model('appointment', appointmentSchema)
export default appointmentModel