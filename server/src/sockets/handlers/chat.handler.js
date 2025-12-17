// server/src/sockets/handlers/chat.handler.js

import {
  sendMessageInChat,
  markMessagesAsSeen,
} from "../../services/chat.service.js";

/**
 * Register all chat-related socket listeners for this socket.
 *
 * Expected client events:
 *  - "chat:join"   { chatId }
 *  - "chat:message"{ chatId, text }
 *  - "chat:seen"   { chatId }
 *
 * Server emits:
 *  - "chat:message" { chatId, message }
 *  - "chat:seen"    { chatId, userId }
 */
export const registerChatHandlers = (io, socket) => {
  // Join a chat room so messages can be broadcast to it
  socket.on("chat:join", ({ chatId }) => {
    if (!chatId) return;
    socket.join(`chat:${chatId}`);
  });

  // Send a message in a chat
  socket.on("chat:message", async ({ chatId, text }) => {
    try {
      // later we'll attach userId from auth; for now guard it
      const userId = socket.userId;
      if (!userId || !chatId || !text?.trim()) return;

      const message = await sendMessageInChat({
        chatId,
        senderId: userId,
        text: text.trim(),
      });

      // Broadcast to everyone in this chat room
      io.to(`chat:${chatId}`).emit("chat:message", {
        chatId,
        message,
      });
    } catch (err) {
      console.error("🔴 socket chat:message error:", err);
    }
  });

  // Mark messages as seen
  socket.on("chat:seen", async ({ chatId }) => {
    try {
      const userId = socket.userId;
      if (!userId || !chatId) return;

      await markMessagesAsSeen({ chatId, userId });

      io.to(`chat:${chatId}`).emit("chat:seen", {
        chatId,
        userId,
      });
    } catch (err) {
      console.error("🔴 socket chat:seen error:", err);
    }
  });
};
