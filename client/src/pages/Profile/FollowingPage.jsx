// client/src/pages/Profile/FollowingPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getFollowingRequest } from "../../api/user.api";
import UserListItem from "../../components/user/UserListItem.jsx";

const FollowingPage = () => {
  const { user } = useAuth();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        const res = await getFollowingRequest(user._id, {
          page: 1,
          limit: 50
        });
        setFollowing(res.data?.data?.following || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load following list."
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?._id]);

  return (
    <div className="px-6 py-4 text-white">
      <h1 className="text-xl font-semibold mb-4">Following</h1>
      {loading && <p className="text-sm text-gray-400">Loading...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {!loading && !following.length && (
        <p className="text-sm text-gray-400">You’re not following anyone yet.</p>
      )}
      <div className="space-y-3">
        {following.map((u) => (
          <UserListItem key={u._id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default FollowingPage;
