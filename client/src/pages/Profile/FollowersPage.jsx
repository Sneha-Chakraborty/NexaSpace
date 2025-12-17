// client/src/pages/Profile/FollowersPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getFollowersRequest } from "../../api/user.api";
import UserListItem from "../../components/user/UserListItem.jsx";

const FollowersPage = () => {
  const { user } = useAuth();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        const res = await getFollowersRequest(user._id, { page: 1, limit: 50 });
        setFollowers(res.data?.data?.followers || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load followers."
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?._id]);

  return (
    <div className="px-6 py-4 text-white">
      <h1 className="text-xl font-semibold mb-4">Followers</h1>
      {loading && <p className="text-sm text-gray-400">Loading...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {!loading && !followers.length && (
        <p className="text-sm text-gray-400">No followers yet.</p>
      )}
      <div className="space-y-3">
        {followers.map((u) => (
          <UserListItem key={u._id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;
