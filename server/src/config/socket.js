import { ENV } from "./env.js";

export const socketOptions = {
  cors: {
    origin: ENV.clientOrigin,
    methods: ["GET", "POST"],
    credentials: true
  }
};
