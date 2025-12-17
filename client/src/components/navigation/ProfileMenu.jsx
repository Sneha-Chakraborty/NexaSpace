//(Wireframe 4).
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import UserAvatar from "../user/UserAvatar.jsx";

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center justify-center rounded-full border border-white/70 h-10 w-10 bg-transparent"
      >
        <UserAvatar user={user} size={28} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-44 rounded-2xl border border-white/25 bg-black/90 px-4 py-4 z-20">
          <button
            className="block w-full text-left text-sm py-1 hover:text-nexablue"
            onClick={() => {
              setOpen(false);
              navigate("/profile/edit");
            }}
          >
            Edit Profile
          </button>
          <button
            className="block w-full text-left text-sm py-1 hover:text-nexablue"
            onClick={() => {
              setOpen(false);
              alert("Verified badge purchase coming soon!");
            }}
          >
            Purchase Verified Badge
          </button>
          <button
            className="block w-full text-left text-sm py-1 mt-1 text-red-300 hover:text-red-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
