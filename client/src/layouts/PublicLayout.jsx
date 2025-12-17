// import PublicNavbar from "../components/navigation/PublicNavbar.jsx";
// import Footer from "../components/footer/Footer.jsx";

// const PublicLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-nexablack text-white">
//       <PublicNavbar />
//       <main className="flex-1 flex justify-center items-center px-4">
//         <div className="w-full max-w-5xl">{children}</div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default PublicLayout;



// client/src/layouts/PublicLayout.jsx
import PublicNavbar from "../components/navigation/PublicNavbar.jsx";
import Footer from "../components/footer/Footer.jsx";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050509] text-white">
      <div className="w-full max-w-6xl mx-4 bg-black border border-white/20 rounded-2xl shadow-xl flex flex-col min-h-[80vh]">
        <PublicNavbar />

        <main className="flex-1 flex items-center justify-center px-10 py-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
