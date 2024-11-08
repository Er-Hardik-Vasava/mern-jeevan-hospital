import express from "express"
import { deleteAppointment, getAllAppointments, getMyAppointments, postAppointment, updateAppointmentStatus } from "../controllers/appointment.controller.js"
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/post",isPatientAuthenticated ,postAppointment)
router.get("/get-all", isAdminAuthenticated, getAllAppointments)
router.get("/get-all", isPatientAuthenticated, getAllAppointments)
router.get("/get-my", isPatientAuthenticated, getMyAppointments)
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus)
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment)

export default router;