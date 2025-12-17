// client/src/pages/Dashboard/widgets/FavoritesShortcutCard.jsx
import { useNavigate } from "react-router-dom";

const FavoritesShortcutCard = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/bookmarks")}
      className="w-full rounded-lg border border-white/40 px-4 py-4 text-left hover:border-nexablue transition-colors"
    >
      <div className="text-xs text-gray-300 mb-1 uppercase tracking-wide">
        Favorites
      </div>
      <div className="text-sm text-gray-100">
        See your saved posts / bookmarks.
      </div>
    </button>
  );
};

export default FavoritesShortcutCard;
