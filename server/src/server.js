import http from "http";
import { Server as SocketIOServer } from "socket.io";

import app from "./app.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { socketOptions } from "./config/socket.js";
import { initSockets } from "./sockets/index.js";

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);
  const io = new SocketIOServer(server, socketOptions);

  // Attach io to app so we can use it later in controllers if needed
  app.set("io", io);
  initSockets(io);

  server.listen(ENV.port, () => {
    console.log(`🚀 NexaSpace API listening on http://localhost:${ENV.port}`);
  });
};

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
