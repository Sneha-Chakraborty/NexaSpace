//(Wireframe 4 link).
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getMyProfile,
  updateMyProfile,
  uploadAvatar
} from "../../api/user.api";
import UserAvatar from "../../components/user/UserAvatar.jsx";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    location: "",
    website: ""
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        const u = res.data.data.user;
        setProfile(u);
        setForm({
          name: u.name || "",
          bio: u.bio || "",
          location: u.location || "",
          website: u.website || ""
        });
      })
      .catch(() => {
        setError("Failed to load profile.");
      });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));

    try {
      setSaving(true);
      const res = await uploadAvatar(file);
      setProfile(res.data.data.user);
      setSaving(false);
    } catch (err) {
      setSaving(false);
      setError(
        err.response?.data?.message || "Failed to upload avatar. Try again."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);
      const res = await updateMyProfile(form);
      setProfile(res.data.data.user);
      navigate("/profile/me");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="mt-4 text-sm text-gray-300">Loading profile...</div>
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-lg rounded-[32px] border border-white/25 bg-black/70 px-8 py-8">
        <h1 className="text-xl font-semibold text-center mb-6">Edit Profile</h1>

        <div className="flex flex-col items-center mb-6 gap-3">
          <div className="relative">
            <UserAvatar
              user={{
                ...profile,
                avatarUrl: avatarPreview || profile.avatarUrl
              }}
              size={72}
            />
            <label className="absolute -bottom-2 -right-2 cursor-pointer text-[10px] px-2 py-1 rounded-full bg-nexablue text-black">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <p className="text-xs text-gray-400">
            Recommended square image, max 2MB.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">Website</label>
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-md bg-transparent border border-white/25 px-3 py-2 text-sm outline-none focus:border-nexablue"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 mt-1 text-center">{error}</p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/profile/me"
              className="text-xs text-gray-400 hover:text-nexablue"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md bg-nexablue text-black text-sm font-semibold hover:bg-blue-400 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
