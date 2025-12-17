// const DashboardPage = () => {
//   return (
//     <div className="text-center text-gray-300">
//       Dashboard shell – real feed comes in Feature 4.
//     </div>
//   );
// };

// export default DashboardPage;


// client/src/pages/Dashboard/DashboardPage.jsx
// import LeftStatsPanel from "./sections/LeftStatsPanel.jsx";
// import FeedPanel from "./sections/FeedPanel.jsx";
// import RightQuickNav from "./sections/RightQuickNav.jsx";

// const DashboardPage = () => {
//   // Dummy stats + posts for now (no backend yet)
//   const stats = {
//     followers: 100,
//     following: 50
//   };

//   const dummyPosts = [
//     {
//       id: 1,
//       authorName: "Profile_Name_1",
//       isFollowing: true,
//       content:
//         "Excited to be on NexaSpace! This is a sample post in your dummy feed.",
//       createdAt: "Just now"
//     },
//     {
//       id: 2,
//       authorName: "Profile_Name_2",
//       isFollowing: true,
//       content:
//         "Another example post. Later this will come from the backend feed.",
//       createdAt: "5 min ago"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//       {/* Left stats column */}
//       <div className="md:col-span-3">
//         <LeftStatsPanel stats={stats} />
//       </div>

//       {/* Center feed */}
//       <div className="md:col-span-6">
//         <FeedPanel posts={dummyPosts} />
//       </div>

//       {/* Right quick navigation */}
//       <div className="md:col-span-3">
//         <RightQuickNav />
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


import LeftStatsPanel from "./sections/LeftStatsPanel.jsx";
import FeedPanel from "./sections/FeedPanel.jsx";
import RightQuickNav from "./sections/RightQuickNav.jsx";
import useInfiniteFeed from "../../hooks/useInfiniteFeed.js";

const DashboardPage = () => {
  const stats = {
    followers: 100,
    following: 50
  };

  const { posts, loadMore, loading, hasMore, error } = useInfiniteFeed();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-3">
        <LeftStatsPanel stats={stats} />
      </div>

      <div className="md:col-span-6">
        <FeedPanel
          posts={posts}
          loadMore={loadMore}
          loading={loading}
          hasMore={hasMore}
          error={error}
        />
      </div>

      <div className="md:col-span-3">
        <RightQuickNav />
      </div>
    </div>
  );
};

export default DashboardPage;
