// // client/src/pages/Dashboard/sections/FeedPanel.jsx
// import PostCard from "../../../components/post/PostCard.jsx";

// const FeedPanel = ({ posts }) => {
//   return (
//     <section className="border-x border-white/20 px-3 md:px-6 py-2">
//       <h2 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-center text-gray-400 mb-4">
//         Home Feed (Infinite Scroll)
//       </h2>

//       <div className="space-y-4">
//         {posts.map((post) => (
//           <PostCard key={post.id} post={post} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeedPanel;


import PostCard from "../../../components/post/PostCard.jsx";

const FeedPanel = ({ posts, loadMore, loading, hasMore, error }) => {
  return (
    <section className="border-x border-white/20 px-3 md:px-6 py-2">
      <h2 className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-center text-gray-400 mb-4">
        Home Feed (Infinite Scroll)
      </h2>

      {posts.length === 0 && !loading && !error && (
        <p className="text-xs text-center text-gray-500 mb-4">
          No posts yet. Create your first post!
        </p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id || post._id} post={post} />
        ))}
      </div>

      {error && (
        <p className="text-xs text-center text-red-400 mt-3">{error}</p>
      )}

      <div className="mt-4 flex justify-center">
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-1.5 rounded-full border border-white/40 text-xs hover:border-nexablue disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        ) : (
          posts.length > 0 && (
            <p className="text-[11px] text-gray-500">
              You&apos;re all caught up.
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default FeedPanel;
