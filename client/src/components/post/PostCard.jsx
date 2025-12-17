// client/src/components/post/PostCard.jsx

import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  followUserRequest,
  unfollowUserRequest,
} from "../../api/user.api.js";
import UserAvatar from "../user/UserAvatar.jsx";
import PostMedia from "./PostMedia.jsx";

const PostCard = ({ post }) => {
  const { user, refreshUser } = useAuth();

  if (!post) return null;

  const isOwnPost = user && post?.author?.id === user?.id;

  /**
   * Decide if current user already follows this author.
   * Priority:
   * 1) server hint on the post.author object (isFollowedByCurrentUser / isFollowing)
   * 2) derive from logged-in user's `following` array (strings or objects)
   */
  const derivedInitialFollowing = useMemo(() => {
    // 1) trust backend flag if it exists
    if (
      typeof post?.author?.isFollowedByCurrentUser === "boolean"
    ) {
      return post.author.isFollowedByCurrentUser;
    }
    if (typeof post?.author?.isFollowing === "boolean") {
      return post.author.isFollowing;
    }

    // 2) fall back to AuthContext user.following array
    if (!user || !post?.author?.id || !Array.isArray(user.following)) {
      return false;
    }

    const targetId = String(post.author.id);

    return user.following.some((f) => {
      if (!f) return false;
      if (typeof f === "string") return f === targetId;
      if (typeof f === "object") {
        return (
          String(f.id ?? f._id ?? "") === targetId ||
          (typeof f.toString === "function" &&
            f.toString() === targetId)
        );
      }
      return false;
    });
  }, [user, post]);

  const [isFollowing, setIsFollowing] = useState(derivedInitialFollowing);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const handleFollowToggle = async () => {
    if (!user || isOwnPost) return;
    if (!post?.author?.id) return;

    const authorId = post.author.id;
    const previous = isFollowing;

    try {
      setLoadingFollow(true);

      if (previous) {
        // currently following → unfollow
        setIsFollowing(false);
        await unfollowUserRequest(authorId);
      } else {
        // currently not following → follow
        setIsFollowing(true);
        await followUserRequest(authorId);
      }

      // 🔁 refresh /auth/me so Followers / Following counts update
      await refreshUser();
    } catch (err) {
      console.error("Follow/unfollow failed:", err);
      // rollback UI if request failed
      setIsFollowing(previous);
    } finally {
      setLoadingFollow(false);
    }
  };

  return (
    <article className="rounded-[32px] border border-white/15 bg-black/40 px-8 py-6 flex flex-col gap-4">
      {/* Header: avatar + name + time + follow button */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            name={post.author?.name || post.author?.username}
            avatarUrl={post.author?.avatarUrl || post.author?.profilePic}
            size="md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">
                {post.author?.name || post.author?.username}
              </span>
              {post.author?.username && (
                <span className="text-xs text-gray-400">
                  @{post.author.username}
                </span>
              )}
              {post.author?.verified && (
                <span className="text-[10px] rounded-full border border-blue-400/60 px-2 py-0.5 text-blue-300">
                  Verified
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {dayjs(post.createdAt).format("DD/MM/YYYY, h:mm a")}
            </span>
          </div>
        </div>

        {!isOwnPost && (
          <button
            type="button"
            onClick={handleFollowToggle}
            disabled={loadingFollow}
            className={`min-w-[96px] rounded-full border px-4 py-1 text-sm transition
              ${
                isFollowing
                  ? "border-white/55 bg-transparent text-white hover:bg-white/10"
                  : "border-sky-500 bg-sky-500 text-black hover:bg-sky-400"
              }`}
          >
            {loadingFollow ? "..." : isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Text */}
      {post.text && (
        <p className="text-sm leading-relaxed text-gray-100">
          {post.text}
        </p>
      )}

      {/* Media */}
      {post.mediaUrl && (
        <PostMedia src={post.mediaUrl} alt="Post media" />
      )}

      {/* Actions row (like/comment/bookmark icons – placeholders for now) */}
      <div className="mt-2 flex items-center gap-4 text-lg">
        <button className="hover:scale-110 transition" type="button">
          🤍
        </button>
        <button className="hover:scale-110 transition" type="button">
          💬
        </button>
        <button className="hover:scale-110 transition" type="button">
          📌
        </button>
      </div>
    </article>
  );
};

export default PostCard;
