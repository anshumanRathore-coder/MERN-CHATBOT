import { Router } from "express";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controller.js";
import { messageValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/tokenMange.js";

//Protected API
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(messageValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;