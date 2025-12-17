// // used inside AppLayout for logged-in SPA.
// import { Link, useNavigate } from "react-router-dom";
// import SearchBar from "./SearchBar.jsx";
// import ProfileMenu from "./ProfileMenu.jsx";

// const TopNavbar = () => {
//   const navigate = useNavigate();

//   return (
//     <header className="w-full border-b border-white/15 bg-black/60 backdrop-blur z-20">
//       <div className="mx-auto max-w-6xl px-6 py-4 grid grid-cols-[auto,minmax(0,1fr),auto] items-center gap-4">
//         {/* Left: logo */}
//         <Link
//           to="/dashboard"
//           className="text-sm font-semibold tracking-[0.3em] uppercase whitespace-nowrap"
//         >
//           NexaSpace
//         </Link>

//         {/* Center: search bar, centered within the navbar */}
//         <div className="flex justify-center">
//           <div className="w-full max-w-3xl">
//             <SearchBar />
//           </div>
//         </div>

//         {/* Right: create + profile */}
//         <div className="flex items-center gap-3 justify-end">
//           <button
//             type="button"
//             onClick={() => navigate("/posts/create")}
//             className="flex items-center justify-center rounded-full border border-white/70 h-10 w-10 text-2xl leading-none"
//             title="Create Post"
//           >
//             +
//           </button>

//           <ProfileMenu />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopNavbar;



// used inside AppLayout for logged-in SPA.
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import ProfileMenu from "./ProfileMenu.jsx";

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-white/15 bg-black/60 backdrop-blur z-20">
      {/* 3 equal columns: left logo, center search, right actions */}
      <div className="mx-auto max-w-6xl px-6 py-4 grid grid-cols-3 items-center">
        {/* Left: logo */}
        <div className="justify-self-start">
          <Link
            to="/dashboard"
            className="text-sm font-semibold tracking-[0.3em] uppercase whitespace-nowrap"
          >
            NexaSpace
          </Link>
        </div>

        {/* Center: search bar, truly centered in the navbar */}
        <div className="justify-self-center w-full max-w-2xl">
          <SearchBar />
        </div>

        {/* Right: create button + profile menu */}
        <div className="justify-self-end flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/posts/create")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-2xl leading-none"
            title="Create Post"
          >
            +
          </button>

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
