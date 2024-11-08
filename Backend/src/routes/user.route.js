import express from "express"
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logOutAdmin, logOutPatient, patientRegister } from "../controllers/user.controller.js"
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/patient/register", patientRegister)
router.post("/login", login)
router.post("/admin/register", isAdminAuthenticated,addNewAdmin)
router.post("/doctor/add", isAdminAuthenticated, addNewDoctor)
router.get("/doctors",getAllDoctors)
router.get("/patient/me", isPatientAuthenticated, getUserDetails)
router.get("/admin/me", isAdminAuthenticated, getUserDetails)
router.get("/admin/logout", isAdminAuthenticated, logOutAdmin)
router.get("/patient/logout", isPatientAuthenticated, logOutPatient)

export default router