import { Appointment } from "../model/appointment.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const postAppointment = asyncHandler(async (req, res) => {
    const {
        firstName, lastName, email, phone, nic, dob, gender,
        appointment_date, department, doctorName, hasVisited, address
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender ||
        !appointment_date || !department || !doctorName || 
        hasVisited === undefined || !address) {
        return res.status(400).json({ success: false, message: "Please fill out the full form!" });
    }

    const isConflict = await User.find({
        doctorName,
        role: "Doctor",
        doctorDepartment: department,
    });

    // Check for doctor existence and conflicts
    if (isConflict.length === 0) {
        return res.status(404).json({ success: false, message: "Doctor not found!" });
    }

    if (isConflict.length > 1) {
        return res.status(400).json({ success: false, message: "Doctors conflict! Please contact through email or phone!" });
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    try {
        const appointment = await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            appointment_date,
            department,
            doctorName,
            hasVisited,
            address,
            doctorId,
            patientId,
        });

        return res.status(200).json({ success: true, data: appointment, message: "Appointment sent!" });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ success: false, message: "Error creating appointment. Please try again." });
    }
});

export const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find();
    return res.status(200).json({ success: true, data: appointments });
});

export const getMyAppointments = asyncHandler(async (req, res, next) => {
    const appointment = await Appointment.find({ patientId: req.user._id });

    if (!appointment || appointment.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Appointment found."
        });
    }

    return res.status(200).json({
        success: true,
        data: appointment
    });
});


export const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found!" });
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    return res.status(200).json({ success: true, data: appointment, message: "Appointment status updated!" });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found!" });
    }

    await appointment.deleteOne();

    return res.status(200).json({ success: true, message: "Appointment deleted!" });
});
