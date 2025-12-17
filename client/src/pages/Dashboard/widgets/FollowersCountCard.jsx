// client/src/pages/Dashboard/widgets/FollowersCountCard.jsx
const FollowersCountCard = ({ count = 0 }) => {
  return (
    <button className="w-full rounded-lg border border-white/40 px-4 py-4 text-left hover:border-nexablue transition-colors">
      <div className="text-xs text-gray-300 mb-1 uppercase tracking-wide">
        Followers
      </div>
      <div className="text-2xl font-semibold">{count}</div>
    </button>
  );
};

export default FollowersCountCard;
