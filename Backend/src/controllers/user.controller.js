import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwtToken.js";
import bcrypt from 'bcrypt';

export const patientRegister = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return res.status(400).json({ success: false, message: "Please fill out the full form!" });
    }

    const isRegistered = await User.findOne({ email }).exec();
    if (isRegistered) {
        return res.status(400).json({ success: false, message: "User already registered!" });
    }

    const user = await User.create({
        firstName, lastName, email, phone, nic, dob, gender, password, role: "Patient"
    });

    generateToken(user, "User registered!", 201, res);
});

export const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ success: false, message: "Please fill out the full form!" });
    }

    const user = await User.findOne({ email }).select("+password").exec();
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password!" });
    }

    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
        return res.status(401).json({ success: false, message: "Invalid email or password!" });
    }

    if (role !== user.role) {
        return res.status(403).json({ success: false, message: "User not found with this role!" });
    }

    generateToken(user, "Login successfully!", 200, res);
});

export const addNewAdmin = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return res.status(400).json({ success: false, message: "Please fill out the full form!" });
    }

    const isRegistered = await User.findOne({ email }).exec();
    if (isRegistered) {
        return res.status(400).json({ success: false, message: "Admin with this email already exists!" });
    }

    
    const admin = await User.create({ firstName, lastName, email, phone, nic, dob, gender, password, role: "Admin" });
    res.status(201).json({ success: true, data: admin, message: "New admin registered" });
});

export const addNewDoctor = asyncHandler(async (req, res) => {
    const { doctorName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;

    if (!doctorName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
        return res.status(400).json({ success: false, message: "Please fill out the full form!" });
    }

    const isRegistered = await User.findOne({ email }).exec();
    if (isRegistered) {
        return res.status(400).json({ success: false, message: "Doctor with this email already exists!" });
    }

    const doctor = await User.create({ doctorName, email, phone, nic, dob, gender, password, role: "Doctor", doctorDepartment });
    res.status(201).json({ success: true, data: doctor, message: "New doctor registered!" });
});

export const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await User.find({ role: "Doctor" }).exec();
    res.status(200).json({ success: true, data: doctors, message: "List of doctors retrieved successfully" });
});

export const getUserDetails = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user, message: "User details retrieved successfully" });
});

export const logOutAdmin = asyncHandler(async (req, res) => {
    res
        .status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Admin logged out successfully."
        });
});

export const logOutPatient = asyncHandler(async (req, res) => {
    res
        .status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Patient logged out successfully."
        });
});
