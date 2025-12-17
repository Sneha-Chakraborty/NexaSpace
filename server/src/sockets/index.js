// server/src/sockets/index.js

import { verifyAccessToken } from "../utils/token.js";
import { registerChatHandlers } from "./handlers/chat.handler.js";

// Initialize all Socket.io logic for the app
export const initSockets = (io) => {
  //Per-socket authentication using the same JWT as HTTP
  io.use((socket, next) => {
    try {
      // Preferred: client passes { auth: { token } } when connecting
      const tokenFromAuth = socket.handshake.auth?.token;

      // Fallback: Authorization: Bearer <token> in headers (rarely used in browsers)
      const headerAuth = socket.handshake.headers?.authorization;
      const tokenFromHeader =
        headerAuth && headerAuth.startsWith("Bearer ")
          ? headerAuth.split(" ")[1]
          : null;

      const token = tokenFromAuth || tokenFromHeader;

      if (!token) {
        return next(new Error("Authentication error: no token provided"));
      }

      // verifyAccessToken should return payload like { sub: userId, ... }
      const payload = verifyAccessToken(token);

      // Attach minimal user info to the socket for handlers to use
      socket.user = { id: payload.sub };

      return next();
    } catch (err) {
      console.error("⚠️ Socket auth error:", err.message);
      return next(new Error("Authentication error"));
    }
  });

  // 🔌 Handle new connections
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id, "user:", socket.user?.id);

    //Register chat-related socket events
    registerChatHandlers(io, socket);

    // (Later you can also register notification / presence handlers here)

    socket.on("disconnect", (reason) => {
      console.log("🔌 Client disconnected:", socket.id, "reason:", reason);
    });
  });
};


export const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    registerChatHandlers(io, socket);
    // registerNotificationHandlers(io, socket);
    // registerPresenceHandlers(io, socket);
  });
};