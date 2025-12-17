// client/src/components/user/FollowButton.jsx
import { useState } from "react";
import {
  followUserRequest,
  unfollowUserRequest
} from "../../api/user.api";
import { useAuth } from "../../context/AuthContext.jsx";

const FollowButton = ({
  targetUserId,
  initialIsFollowing = false,
  onChange
}) => {
  const { user, refreshMe } = useAuth();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  // don't show follow button for yourself or when not logged in
  if (!user || user.id === targetUserId || user._id === targetUserId) {
    return null;
  }

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFollowing) {
        await unfollowUserRequest(targetUserId);
        setIsFollowing(false);
        onChange?.(false);
      } else {
        await followUserRequest(targetUserId);
        setIsFollowing(true);
        onChange?.(true);
      }

      // ⬇️ refresh /auth/me so followers/following counts update
      await refreshMe();
    } catch (err) {
      console.error("Follow toggle failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-1.5 text-xs rounded-full border transition ${
        isFollowing
          ? "border-white bg-white/10 text-white hover:bg-white/20"
          : "border-sky-500 text-sky-400 hover:bg-sky-500/10"
      } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
