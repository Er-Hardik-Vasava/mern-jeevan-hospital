import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
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
        required: [true, "NIC is Required!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is Required!"]
    },
    gender: {
        type: String,
        required: [true, "Gender is Required!"]
    },
    password: {
        type: String,
        required: [true, "Password is Required!"]
    },
    role: {
        type: String,
        required: [true, "Role is Required!"],
        enum: ["Patient", "Doctor", "Admin"]
    },
    doctorName:{
        type: String,
    },
    doctorDepartment: {
        type: String
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        if (typeof this.password === "string") {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error("Error comparing password");
    }
};

userSchema.methods.generateJsonWebToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);
