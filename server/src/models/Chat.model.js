// server/src/models/Chat.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // ✅ MUST be null by default, never ""
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    unreadBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ participants: 1 });

export const Chat = mongoose.model("Chat", chatSchema);
