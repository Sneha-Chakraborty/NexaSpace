// client/src/pages/Dashboard/sections/LeftStatsPanel.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

const StatCard = ({ label, value, to }) => {
  const content = (
    <div className="rounded-2xl border border-white/15 bg-black/60 px-5 py-4">
      <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

const LeftStatsPanel = () => {
  const { user } = useAuth();

  // ✅ Prefer numeric fields, but fall back to array lengths if those exist
  const followersCount =
    user?.followersCount ??
    (Array.isArray(user?.followers) ? user.followers.length : 0);

  const followingCount =
    user?.followingCount ??
    (Array.isArray(user?.following) ? user.following.length : 0);

  return (
    <aside className="w-full max-w-xs space-y-4">
      <StatCard
        label="Followers"
        value={followersCount}
        to="/profile/me/followers"
      />
      <StatCard
        label="Following"
        value={followingCount}
        to="/profile/me/following"
      />
      <div className="rounded-2xl border border-white/15 bg-black/60 px-5 py-4">
        <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400">
          Favorites
        </p>
        <p className="mt-2 text-xs text-gray-300">
          See your saved posts / bookmarks.
        </p>
      </div>
    </aside>
  );
};

export default LeftStatsPanel;
