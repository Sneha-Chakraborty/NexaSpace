// client/src/hooks/useInfiniteFeed.js
import { useCallback, useEffect, useState } from "react";
import { getFeedRequest } from "../api/post.api";

const useInfiniteFeed = (initialPage = 1, pageSize = 5) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const res = await getFeedRequest({ page, limit: pageSize });
      const data = res.data.data;

      // De-duplicate for React StrictMode double fetch
      setPosts((prev) => {
        const map = new Map();
        [...prev, ...data.posts].forEach((p) => {
          const id = p.id || p._id;
          if (id) map.set(id, p);
        });
        return Array.from(map.values());
      });

      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load feed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, hasMore, loading]);

  useEffect(() => {
    loadMore(); // initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { posts, loadMore, loading, hasMore, error };
};

export default useInfiniteFeed;
