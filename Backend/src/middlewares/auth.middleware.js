import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const authenticateUser = (role) => {
    return asyncHandler(async (req, res, next) => {
        const token = req.cookies[`${role}Token`];
        if (!token) {
            return res.status(401).json({ success: false, message: `${role.charAt(0).toUpperCase() + role.slice(1)} token is missing. User is not authenticated` });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.id).exec();
            if (!req.user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            if (req.user.role !== role.charAt(0).toUpperCase() + role.slice(1)) {
                return res.status(403).json({ success: false, message: `${req.user.role} not authorized for this resource!` });
            }
            next();
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({ success: false, message: "Invalid token or token has expired" });
        }
    });
};

export const isAdminAuthenticated = authenticateUser('admin');
export const isPatientAuthenticated = authenticateUser('patient');

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: `${req.user ? req.user.role : 'User'} not allowed to access this resource!` });
        }
        next();
    };
};
