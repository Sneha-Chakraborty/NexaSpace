// client/src/api/chat.api.js
import axiosInstance from "./axiosInstance.js";
import { CHAT_ENDPOINTS } from "./endpoints.js";

export const listChatsRequest = () =>
  axiosInstance.get(CHAT_ENDPOINTS.LIST);

export const startChatRequest = (userId) =>
  axiosInstance.post(CHAT_ENDPOINTS.START, { userId });

export const getChatMessagesRequest = (chatId) =>
  axiosInstance.get(CHAT_ENDPOINTS.MESSAGES(chatId));

export const sendMessageRequest = (chatId, content) =>
  axiosInstance.post(CHAT_ENDPOINTS.MESSAGES(chatId), { content });
