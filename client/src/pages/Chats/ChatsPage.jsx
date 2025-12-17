// client/src/pages/Chats/ChatsPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listChatsRequest } from "../../api/chat.api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import UserAvatar from "../../components/user/UserAvatar.jsx";

const ChatsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUserId = user?.id || user?._id;

  useEffect(() => {
    let cancelled = false;

    const loadChats = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await listChatsRequest();

        // Handle different possible shapes: {data:{chats:[]}} or {data:[]}
        const list =
          res?.data?.data?.chats ??
          res?.data?.chats ??
          res?.data ??
          [];

        if (!cancelled) {
          setChats(list);
        }
      } catch (err) {
        console.error("Failed to load chats", err);
        if (!cancelled) {
          setError(
            err?.response?.data?.message || "Failed to load chats"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadChats();
    return () => {
      cancelled = true;
    };
  }, []);

  const getOtherParticipant = (chat) => {
    const participants = chat.participants || [];
    if (participants.length === 0) return null;
    if (!currentUserId) return participants[0];

    const other =
      participants.find(
        (p) =>
          (p.id || p._id)?.toString() !== currentUserId?.toString()
      ) || participants[0];

    return other;
  };

  const handleOpenChat = (chatId) => {
    if (!chatId) return;
    navigate(`/chats/${chatId}`);
  };

  return (
    <div className="flex flex-col h-full text-slate-100">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-sm tracking-[0.25em] uppercase text-slate-400">
          Chats
        </h1>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1 rounded-full border border-white/25 text-xs hover:bg-white/10"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {loading && (
          <div className="mt-10 text-center text-sm text-slate-400">
            Loading chats…
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && chats.length === 0 && (
          <div className="mt-10 text-center text-sm text-slate-400">
            You don&apos;t have any chats yet.
            <br />
            Start a conversation from a creator&apos;s profile or from
            the dashboard.
          </div>
        )}

        {!loading && !error && chats.length > 0 && (
          <ul className="space-y-3">
            {chats.map((chat) => {
              const chatId = chat.id || chat._id;
              const other = getOtherParticipant(chat);
              const last = chat.lastMessage || {};
              const lastText =
                last.text || "Start the conversation…";
              const updatedAt =
                chat.updatedAt || last.createdAt || null;

              const timeLabel = updatedAt
                ? new Date(updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : "";

              return (
                <li key={chatId}>
                  <button
                    type="button"
                    onClick={() => handleOpenChat(chatId)}
                    className="w-full flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        name={other?.name || other?.username}
                        src={other?.profilePic || other?.avatarUrl}
                        size="md"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {other?.name || other?.username || "Unknown"}
                        </span>
                        {other?.username && (
                          <span className="text-xs text-slate-400">
                            @{other.username}
                          </span>
                        )}
                        <span className="mt-1 text-xs text-slate-300 line-clamp-1">
                          {lastText}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {timeLabel && (
                        <span className="text-[11px] text-slate-500">
                          {timeLabel}
                        </span>
                      )}
                      {chat.unreadCount > 0 && (
                        <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-sky-500 text-[10px] font-semibold text-black flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
