import { useAuth } from "../../../context/AuthContext.jsx";
import UserAvatar from "../../../components/user/UserAvatar.jsx";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();

  const isMine =
    message.senderIsMe ||
    message.senderId === user?.id ||
    message.sender?._id === user?.id;

  const align = isMine ? "items-end text-right" : "items-start text-left";
  const bubble = isMine
    ? "bg-sky-600 text-white"
    : "bg-slate-800 text-slate-100";

  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={`flex gap-2 ${align}`}>
      {!isMine && (
        <UserAvatar
          size="sm"
          src={message.sender?.profilePic}
          name={message.sender?.name || message.sender?.username}
        />
      )}
      <div className="max-w-[70%]">
        <div className={`inline-block px-3 py-2 rounded-2xl text-sm ${bubble}`}>
          {message.content}
        </div>
        {time && (
          <div className="mt-1 text-[10px] text-slate-500">{time}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
