import { addMessage, getAllMessages } from "../controllers/message.controller.js"
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.middleware.js"
import express from "express"

const router = express.Router()

router.post("/send-message", isPatientAuthenticated, addMessage)
router.get("/get-message",isAdminAuthenticated, getAllMessages)

export default router;