// client/src/pages/Dashboard/sections/RightQuickNav.jsx
import { useNavigate } from "react-router-dom";

const items = [
  { label: "Stories", path: "/stories" },
  { label: "Explore", path: "/explore" },
  { label: "Notifications", path: "/notifications" },
  { label: "Chats", path: "/chats" }
];

const RightQuickNav = () => {
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col justify-start border-l border-white/20 pl-4 md:pl-6">
      <nav className="space-y-4 mt-2">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="block text-left text-sm text-gray-100 hover:text-nexablue transition-colors"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default RightQuickNav;
