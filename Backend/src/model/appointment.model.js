import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid Email!"]
    },
    phone: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    hasVisited: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    status: {
        type: String,
    }
}, {
    timestamps: true
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)