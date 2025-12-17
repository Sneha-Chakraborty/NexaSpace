// server/src/controllers/chat.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  listUserChats,
  startChatWithUser,
  getChatMessages,
  sendChatMessage,
} from "../services/chat.service.js";

// Helper: map a chat to JSON shape the frontend expects
const mapChat = (chat, currentUserId) => {
  const other =
    chat.participants?.find(
      (u) => u._id.toString() !== currentUserId.toString()
    ) || chat.participants?.[0];

  return {
    id: chat._id,
    isGroup: chat.isGroup,
    updatedAt: chat.updatedAt,
    participant: other && {
      id: other._id,
      username: other.username,
      name: other.name,
      profilePic: other.profilePic,
    },
    lastMessage: chat.lastMessage && {
      id: chat.lastMessage._id,
      content: chat.lastMessage.content,
      createdAt: chat.lastMessage.createdAt,
      sender: chat.lastMessage.sender && {
        id: chat.lastMessage.sender._id,
        username: chat.lastMessage.sender.username,
        name: chat.lastMessage.sender.name,
        profilePic: chat.lastMessage.sender.profilePic,
      },
    },
  };
};

// Helper: map a single message
const mapMessage = (msg) => ({
  id: msg._id,
  content: msg.content,
  createdAt: msg.createdAt,
  sender: msg.sender && {
    id: msg.sender._id,
    username: msg.sender.username,
    name: msg.sender.name,
    profilePic: msg.sender.profilePic,
  },
});

// GET /chats  -> list user chats
export const listChatsController = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const chats = await listUserChats({ userId });

  res.json(
    new ApiResponse(
      200,
      { chats: chats.map((c) => mapChat(c, userId)) },
      "Chats fetched"
    )
  );
});

// POST /chats/start  -> find or create 1-1 chat
export const findOrCreateChatController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { userId: otherUserId } = req.body;

  const chat = await startChatWithUser({ userId, otherUserId });

  const plain = chat.toObject ? chat.toObject() : chat;

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { chat: mapChat(plain, userId) },
        "Chat ready"
      )
    );
});

// GET /chats/:chatId/messages
export const getMessagesController = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { before } = req.query; // optional for pagination later

  const messages = await getChatMessages({ chatId, before });

  res.json(
    new ApiResponse(
      200,
      { messages: messages.map(mapMessage) },
      "Messages fetched"
    )
  );
});

// POST /chats/:chatId/messages  -> send message
export const sendMessageController = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const userId = req.user._id;
  const { content } = req.body;

  const msg = await sendChatMessage({ chatId, senderId: userId, content });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { message: mapMessage(msg) },
        "Message sent"
      )
    );
});

// POST /chats/start → find existing 1-1 chat or create a new one
export const startChatController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { userId: otherUserId } = req.body;

  const chat = await startChatWithUser({ userId, otherUserId });

  const plain = chat.toObject ? chat.toObject() : chat;

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { chat: mapChat(plain, userId) },
        "Chat ready"
      )
    );
});
