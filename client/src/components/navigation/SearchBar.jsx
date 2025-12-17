// client/src/components/navigation/SearchBar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsersRequest } from "../../api/user.api";
import UserAvatar from "../user/UserAvatar.jsx";
import FollowButton from "../user/FollowButton.jsx";

const SearchBar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // show dropdown whenever there's text in the input
  const showDropdown = query.trim().length > 0;

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError("");
      return;
    }

    const handle = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const res = await searchUsersRequest(query.trim());
        const users = res.data?.data?.users || [];
        setResults(users);
      } catch (err) {
        console.error("User search failed:", err);
        setError(
          err?.response?.data?.message || "Failed to search users."
        );
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350); // debounce

    return () => clearTimeout(handle);
  }, [query]);

  const handleSelectUser = (user) => {
    if (!user) return;
    if (user.username) {
      navigate(`/profile/${user.username}`);
    } else {
      navigate(`/profile/${user._id}`);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search creators by name or username..."
        className="w-full rounded-full bg-black/70 border border-white/20 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70"
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-white/15 bg-black/95 shadow-2xl z-30 max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-xs text-gray-400">
              Searching…
            </div>
          )}

          {!loading && error && (
            <div className="px-4 py-3 text-xs text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && results.length === 0 && (
            <div className="px-4 py-3 text-xs text-gray-400">
              No users found for “{query.trim()}”.
            </div>
          )}

          {!loading &&
            !error &&
            results.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer"
              >
                {/* left: avatar + name, click to open profile */}
                <div
                  className="flex items-center gap-3"
                  onClick={() => handleSelectUser(user)}
                >
                  <UserAvatar
                    size="sm"
                    src={user.avatarUrl}
                    name={user.name || user.username || "Nexa User"}
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {user.name || user.username || "Nexa User"}
                    </p>
                    {user.username && (
                      <p className="text-[11px] text-gray-400">
                        @{user.username}
                      </p>
                    )}
                  </div>
                </div>

                {/* right: follow/unfollow */}
                <FollowButton targetUserId={user._id} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
