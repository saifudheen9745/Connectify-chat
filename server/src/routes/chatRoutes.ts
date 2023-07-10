import express from "express";
import { createAChat, sendAMessage } from "../controllers/chatControllers";

const router = express.Router();

//To create a chat between two members
router.post('/createAChat',createAChat)
//To send a message
router.post('/sendAMessage',sendAMessage)

export default router;
