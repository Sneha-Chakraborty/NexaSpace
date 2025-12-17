// client/src/pages/Posts/CreatePostPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPostRequest } from "../../api/post.api";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim() && !imageFile) {
      setError("Write something or add a photo to post.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      if (text.trim()) formData.append("text", text.trim());
      if (imageFile) formData.append("media", imageFile);

      await createPostRequest(formData);

      // After successful post, go back to dashboard feed
      navigate("/dashboard");
    } catch (err) {
      console.error("Create post error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    // optional: you could confirm here if text or image are filled
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-transparent text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl rounded-[32px] border border-white/20 bg-black/70 px-8 py-8 space-y-6 shadow-2xl"
      >
        <h1 className="text-center text-xl tracking-[0.25em] text-gray-300 uppercase">
          Create Post
        </h1>

        {/* Post text area */}
        <div>
          <textarea
            rows={6}
            placeholder="Type here..."
            className="w-full resize-none rounded-2xl bg-black border border-white/25 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div className="rounded-2xl overflow-hidden border border-white/20">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-full max-h-72 object-cover"
            />
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-400 text-right -mt-2">{error}</p>
        )}

        {/* Actions row */}
        <div className="flex items-center justify-between pt-2">
          {/* Left: file inputs */}
          <div className="flex items-center gap-6 text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer text-sky-400 hover:text-sky-300">
              <span role="img" aria-label="photo">
                🖼️
              </span>
              <span>Add Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-gray-500 cursor-not-allowed"
              disabled
            >
              <span role="img" aria-label="document">
                📄
              </span>
              <span>Add Document (coming soon)</span>
            </button>
          </div>

          {/* Right: Cancel + Post buttons */}
          <div className="flex items-center gap-3">
            {/* 🔹 New Cancel button */}
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 rounded-xl border border-white/25 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold shadow-md transition-colors disabled:opacity-60"
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
