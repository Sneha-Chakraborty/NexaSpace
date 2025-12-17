// client/src/components/post/PostActions.jsx
import { useState } from "react";

const PostActions = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center gap-4 text-xl text-gray-300">
      <button
        type="button"
        onClick={() => setLiked((v) => !v)}
        className={`transition-colors ${
          liked ? "text-pink-500" : "hover:text-pink-400"
        }`}
      >
        ♥
      </button>

      <button
        type="button"
        className="text-lg hover:text-nexablue transition-colors"
      >
        💬
      </button>

      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        className={`ml-auto text-lg transition-colors ${
          saved ? "text-nexablue" : "hover:text-nexablue"
        }`}
      >
        🔖
      </button>
    </div>
  );
};

export default PostActions;
