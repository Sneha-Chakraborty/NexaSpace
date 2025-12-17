import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProfile } from "../../api/user.api";
import UserAvatar from "../../components/user/UserAvatar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const MyProfilePage = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  const display = profile || authUser;

  if (loading && !display) {
    return <p className="text-sm">Loading profile...</p>;
  }

  if (!display) {
    return <p className="text-sm">No profile data.</p>;
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-lg rounded-[32px] border border-white/25 bg-black/70 px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <UserAvatar user={display} size={64} />
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {display.name || display.username}
              {display.verified && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-nexablue text-black uppercase tracking-wide">
                  Verified
                </span>
              )}
            </h2>
            <p className="text-xs text-gray-400">@{display.username}</p>
            <p className="text-xs text-gray-400">{display.email}</p>
          </div>
        </div>

        {display.bio && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
              Bio
            </h3>
            <p className="text-sm text-gray-100">{display.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Location
            </div>
            <div className="mt-1">
              {display.location || <span className="text-gray-500">—</span>}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Website
            </div>
            <div className="mt-1">
              {display.website ? (
                <a
                  href={display.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-nexablue hover:underline break-all"
                >
                  {display.website}
                </a>
              ) : (
                <span className="text-gray-500">—</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/profile/edit"
            className="px-4 py-2 rounded-md border border-white/40 text-sm hover:border-nexablue hover:text-nexablue"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
