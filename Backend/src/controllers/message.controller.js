import { Message } from "../model/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addMessage = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newMessage = await Message.create({
        firstName,
        lastName,
        email,
        phone,
        message,
    });

    return res.status(200).json({ success: true, message: "Message sent successfully.", data: newMessage });
});

export const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find();

    if (!messages || messages.length === 0) {
        return res.status(404).json({ success: false, message: "No messages found!" });
    }

    return res.status(200).json({ success: true, message: "Messages found!", data: messages });
});
