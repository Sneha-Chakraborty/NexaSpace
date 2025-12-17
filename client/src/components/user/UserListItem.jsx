// client/src/components/user/UserListItem.jsx
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar.jsx";
import FollowButton from "./FollowButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const UserListItem = ({ user }) => {
  const { user: currentUser } = useAuth();

  if (!user) return null;

  const isSelf = currentUser?._id === user._id;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <UserAvatar
          size="sm"
          src={user.avatarUrl}
          name={user.name || user.username || "Nexa User"}
        />
        <div>
          <Link
            to={
              isSelf
                ? "/profile/me"
                : `/profile/${user.username || user._id}`
            }
            className="text-sm font-semibold hover:underline"
          >
            {user.name || user.username || "Nexa User"}
          </Link>
          {user.username && (
            <p className="text-xs text-gray-400">@{user.username}</p>
          )}
        </div>
      </div>

      {/* Follow/Unfollow button (hidden for yourself) */}
      {!isSelf && user._id && (
        <FollowButton targetUserId={user._id} />
      )}
    </div>
  );
};

export default UserListItem;
