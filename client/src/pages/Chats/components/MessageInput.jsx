import { useState } from "react";

const MessageInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    if (onSend) onSend(text);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 flex items-center gap-3 rounded-3xl border border-slate-800 bg-[#05070d] px-4 py-2"
    >
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-sm text-slate-100 placeholder:text-slate-500"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="px-4 py-1.5 rounded-full bg-sky-500 text-xs font-semibold text-black hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
