import MessageBubble from "./MessageBubble.jsx";

const ChatWindow = ({ messages, loading, error, bottomRef }) => {
  return (
    <div className="flex-1 rounded-3xl border border-slate-800 bg-[#05070d] px-4 py-3 overflow-y-auto">
      {loading && (
        <div className="text-center text-slate-400 text-sm py-4">
          Loading conversation...
        </div>
      )}

      {!loading && !error && messages.length === 0 && (
        <div className="text-center text-sky-300/80 text-sm py-4">
          Start the conversation…
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 text-sm py-2">{error}</div>
      )}

      <div className="space-y-2">
        {messages.map((m) => (
          <MessageBubble key={m._id} message={m} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
