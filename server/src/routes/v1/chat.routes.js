import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  listChatsController,
  startChatController,
  getMessagesController,
  sendMessageController,
} from "../../controllers/chat.controller.js";

const router = Router();

// all chat routes require auth
router.use(authMiddleware);

// GET /api/v1/chats           -> list user’s chats
router.get("/", listChatsController);

// POST /api/v1/chats/start    -> start/find chat with another user
router.post("/start", startChatController);

// GET /api/v1/chats/:chatId/messages   -> get messages in a chat
router.get("/:chatId/messages", getMessagesController);

// POST /api/v1/chats/:chatId/messages  -> send a message
router.post("/:chatId/messages", sendMessageController);

export default router;
