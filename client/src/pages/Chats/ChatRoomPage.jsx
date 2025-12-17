// client/src/pages/Chats/ChatRoomPage.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getChatMessagesRequest,
  sendMessageRequest,
} from "../../api/chat.api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import UserAvatar from "../../components/user/UserAvatar.jsx";
import MessageInput from "./components/MessageInput.jsx";

const ChatRoomPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  const currentUserId = user?.id || user?._id;

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load chat + messages
  useEffect(() => {
    if (!chatId) return;

    let cancelled = false;

    const loadMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getChatMessagesRequest(chatId);

        // Very defensive – handle several possible shapes:
        const data = res?.data?.data || res?.data || {};
        const chatDoc = data.chat || data.chatInfo || null;
        const msgs = data.messages || data || [];

        if (cancelled) return;

        setChat(chatDoc);
        setMessages(Array.isArray(msgs) ? msgs : []);
      } catch (err) {
        console.error("Failed to load chat messages", err);
        if (!cancelled) {
          setError(
            err?.response?.data?.message || "Failed to load conversation"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadMessages();
    return () => {
      cancelled = true;
    };
  }, [chatId]);

  const handleSend = async (text) => {
    const content = text?.trim();
    if (!content) return;

    try {
      const res = await sendMessageRequest(chatId, content);

      const data = res?.data?.data || res?.data || {};
      const newMsg = data.message || data;

      // Optimistically add the sent message
      setMessages((prev) => [...prev, newMsg]);
    } catch (err) {
      console.error("Failed to send message", err);
      // You can surface a toast later; for now we just log
    }
  };

  // Figure out who the "other" user is from chat.participants
  const getOtherParticipant = () => {
    const participants = chat?.participants || [];
    if (!participants.length) return null;
    if (!currentUserId) return participants[0];

    return (
      participants.find(
        (p) => (p.id || p._id)?.toString() !== currentUserId?.toString()
      ) || participants[0]
    );
  };

  const other = getOtherParticipant();

  return (
    <div className="flex flex-col h-full text-slate-100 bg-black">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/chats")}
            className="mr-2 rounded-full border border-white/30 w-8 h-8 flex items-center justify-center text-xs hover:bg-white/10"
          >
            ←
          </button>
          <UserAvatar
            name={other?.name || other?.username || "Chat"}
            src={other?.profilePic || other?.avatarUrl}
            size="md"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {other?.name || other?.username || "Conversation"}
            </span>
            {other?.username && (
              <span className="text-xs text-slate-400">
                @{other.username}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1 rounded-full border border-white/25 text-xs hover:bg-white/10"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 bg-[#05070b]">
        {loading && (
          <div className="mt-10 text-center text-sm text-slate-400">
            Loading conversation…
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="mt-10 text-center text-sm text-slate-400">
            Start the conversation…
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="space-y-3">
            {messages.map((msg) => {
              const id = msg.id || msg._id;
              const sender = msg.sender || msg.author || {};
              const isMe =
                (sender.id || sender._id)?.toString() ===
                currentUserId?.toString();

              const timeLabel = msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <div
                  key={id}
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                      isMe
                        ? "bg-sky-500 text-black rounded-br-sm"
                        : "bg-white/10 text-slate-100 rounded-bl-sm"
                    }`}
                  >
                    <div className="text-[11px] mb-0.5 text-slate-300">
                      {sender.name || sender.username || (isMe ? "You" : "")}
                    </div>
                    <div>{msg.content || msg.text}</div>
                    {timeLabel && (
                      <div className="mt-1 text-[10px] text-slate-300 text-right">
                        {timeLabel}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-8 py-4 border-t border-white/10 bg-[#05070b]">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatRoomPage;
