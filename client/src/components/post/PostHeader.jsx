// // client/src/components/post/PostHeader.jsx
// import UserAvatar from "../user/UserAvatar.jsx";

// const PostHeader = ({ post }) => {
//   return (
//     <header className="flex items-center justify-between mb-3">
//       <div className="flex items-center gap-3">
//         <UserAvatar
//           user={{ name: post.authorName, username: post.authorName }}
//           size={32}
//         />
//         <div>
//           <div className="text-sm font-semibold">{post.authorName}</div>
//           <div className="text-[11px] text-gray-400">{post.createdAt}</div>
//         </div>
//       </div>

//       <button className="text-[11px] px-3 py-1 rounded-full border border-white/60 hover:border-red-400 hover:text-red-300 transition-colors">
//         Unfollow
//       </button>
//     </header>
//   );
// };

// export default PostHeader;


import UserAvatar from "../user/UserAvatar.jsx";

const PostHeader = ({ post }) => {
  const author = post.author || {};
  const name = author.name || author.username || "User";

  const created =
    post.createdAt && !isNaN(new Date(post.createdAt))
      ? new Date(post.createdAt).toLocaleString()
      : "";

  return (
    <header className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <UserAvatar user={author} size={32} />
        <div>
          <div className="text-sm font-semibold flex items-center gap-1">
            {name}
            {author.verified && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-nexablue text-black uppercase tracking-wide">
                Verified
              </span>
            )}
          </div>
          {created && (
            <div className="text-[11px] text-gray-400">{created}</div>
          )}
        </div>
      </div>

      <button className="text-[11px] px-3 py-1 rounded-full border border-white/60 hover:border-red-400 hover:text-red-300 transition-colors">
        Unfollow
      </button>
    </header>
  );
};

export default PostHeader;
