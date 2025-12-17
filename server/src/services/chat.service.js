// server/src/services/chat.service.js
import { Chat } from "../models/Chat.model.js";
import { Message } from "../models/Message.model.js";
import { ApiError } from "../utils/ApiError.js";

export const listUserChats = async (userId) => {
  const chats = await Chat.find({ participants: userId })
    .sort({ updatedAt: -1 })
    .populate(
      "participants",
      "username name profilePic avatarUrl verified"
    )
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "username name profilePic avatarUrl verified",
      },
    })
    .lean();

  return chats;
};

export const startChatWithUser = async (currentUserId, otherUserId) => {
  if (!otherUserId) {
    throw new ApiError(400, "Target user is required to start a chat");
  }

  if (currentUserId.toString() === otherUserId.toString()) {
    throw new ApiError(400, "You cannot start a chat with yourself");
  }

  // Try to find an existing 1-1 chat with exactly these two participants
  let chat = await Chat.findOne({
    participants: { $all: [currentUserId, otherUserId] },
  })
    .populate(
      "participants",
      "username name profilePic avatarUrl verified"
    )
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "username name profilePic avatarUrl verified",
      },
    });

  // If not found, create a new chat
  if (!chat) {
    chat = await Chat.create({
      participants: [currentUserId, otherUserId],
    });

    // populate participants so controller/UI can use it immediately
    await chat.populate(
      "participants",
      "username name profilePic avatarUrl verified"
    );
  }

  // return a plain object (nice for mapChat in controller)
  return chat.toObject ? chat.toObject() : chat;
};

export const findOrCreateChatBetweenUsers = async (userId, otherUserId) => {
  const participants = [userId.toString(), otherUserId.toString()].sort();

  let chat = await Chat.findOne({ participants });

  if (!chat) {
    // ✅ let lastMessage use default null
    chat = await Chat.create({ participants });
  }

  return chat;
};

export const getChatWithMessages = async (chatId, userId) => {
  const chat = await Chat.findOne({
    _id: chatId,
    participants: userId,
  })
    .populate(
      "participants",
      "username name profilePic avatarUrl verified"
    )
    .lean();

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const messages = await Message.find({ chat: chat._id })
    .sort({ createdAt: 1 })
    .populate(
      "sender",
      "username name profilePic avatarUrl verified"
    )
    .lean();

  return { chat, messages };
};

export const sendChatMessage = async ({ chatId, senderId, content }) => {
  const chat = await Chat.findById(chatId);
  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!chat.participants.some((p) => p.toString() === senderId.toString())) {
    throw new ApiError(403, "You are not a participant of this chat");
  }

  const message = await Message.create({
    chat: chat._id,
    sender: senderId,
    content,
  });

  chat.lastMessage = message._id; // ✅ valid ObjectId
  chat.updatedAt = new Date();
  await chat.save();

  const populated = await message
    .populate(
      "sender",
      "username name profilePic avatarUrl verified"
    )
    .execPopulate?.(); // older Mongoose; if this errors, just return message

  return (populated || message).toObject();
};

export const getChatMessages = async (chatId, userId) => {
  const chat = await Chat.findOne({
    _id: chatId,
    participants: userId,
  })
    .populate(
      "participants",
      "username name profilePic avatarUrl verified"
    )
    .lean();

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const messages = await Message.find({ chat: chat._id })
    .sort({ createdAt: 1 })
    .populate(
      "sender",
      "username name profilePic avatarUrl verified"
    )
    .lean();

  return { chat, messages };
};

export const markMessagesAsSeen = async ({ chatId, userId }) => {
  const chat = await Chat.findOne({
    _id: chatId,
    participants: userId,
  });

  if (!chat) return;

  chat.unreadBy = (chat.unreadBy || []).filter(
    (id) => id.toString() !== userId.toString()
  );
  await chat.save();
};

export const sendMessageInChat = sendChatMessage;