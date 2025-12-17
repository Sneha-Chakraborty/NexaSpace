// import { Link } from "react-router-dom";
// import PublicLayout from "../../layouts/PublicLayout.jsx";

// const LandingPage = () => {
//   return (
//     <PublicLayout>
//       <section className="flex flex-col items-center text-center gap-6 py-16">
//         <h1 className="text-5xl font-semibold">NexaSpace</h1>
//         <p className="text-lg text-nexagrey">Connect in real-time!</p>
//         <div className="flex gap-6 mt-6">
//           <Link
//             to="/register"
//             className="px-6 py-2 rounded bg-nexablue text-black font-medium"
//           >
//             Register
//           </Link>
//           <Link
//             to="/login"
//             className="px-6 py-2 rounded border border-nexablue text-nexablue"
//           >
//             Login
//           </Link>
//         </div>
//       </section>
//     </PublicLayout>
//   );
// };

// export default LandingPage;


// client/src/pages/Landing/LandingPage.jsx
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout.jsx";

const LandingPage = () => {
  return (
    <PublicLayout>
      <section className="w-full flex flex-col items-center text-center gap-6">
        <h1 className="text-5xl font-semibold tracking-wide">NexaSpace</h1>

        <p className="text-lg text-gray-300">Connect in real-time!</p>

        <div className="flex gap-8 mt-8">
          <Link
            to="/register"
            className="px-8 py-2.5 rounded-md bg-blue-500 text-black font-semibold text-sm hover:bg-blue-400 transition-colors"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="px-8 py-2.5 rounded-md bg-blue-500 text-black font-semibold text-sm hover:bg-blue-400 transition-colors"
          >
            Login
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
