// client/src/components/post/PostMedia.jsx
import { API_ORIGIN } from "../../api/endpoints";

const PostMedia = ({ mediaUrl }) => {
  if (!mediaUrl) return null;

  const src = mediaUrl.startsWith("http")
    ? mediaUrl
    : `${API_ORIGIN}${mediaUrl}`;

  return (
    <div className="rounded-2xl border border-white/25 overflow-hidden mb-3">
      <img
        src={src}
        alt="Post media"
        className="w-full max-h-72 object-cover"
      />
    </div>
  );
};

export default PostMedia;
