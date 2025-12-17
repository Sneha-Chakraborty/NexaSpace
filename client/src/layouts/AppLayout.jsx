// //logged-in dashboard.
// import Footer from "../components/footer/Footer.jsx";

// const AppLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-nexablack text-white">
//       {/* TODO: TopNavbar, sidebars, etc. */}
//       <header className="px-4 py-3 border-b border-white/10">
//         Logged-in App Shell (TopNavbar goes here)
//       </header>
//       <main className="flex-1 px-4 py-4">{children}</main>
//       <Footer />
//     </div>
//   );
// };

// export default AppLayout;


import TopNavbar from "../components/navigation/TopNavbar.jsx";
import Footer from "../components/footer/Footer.jsx";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nexablack text-white">
      <div className="w-full max-w-6xl bg-black/80 border border-white/20 rounded-3xl shadow-lg flex flex-col min-h-[80vh]">
        <TopNavbar />
        <main className="flex-1 px-6 py-6 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
