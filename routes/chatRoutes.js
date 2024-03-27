import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {postChatController,getChatsController, getProposedChatDataController} from "../controllers/ChatController.js"

const router = express.Router();

//post a chat
router.post("/post-chat", postChatController);


//get chats by sent id and toid
router.post("/get-chats",getChatsController)

//get response data through chat and display in responses
router.post("/getProposedChatData",getProposedChatDataController)



export default router;
