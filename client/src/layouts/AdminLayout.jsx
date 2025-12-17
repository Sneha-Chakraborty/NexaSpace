import TopNavbar from "../components/navigation/TopNavbar.jsx";
import Footer from "../components/footer/Footer.jsx";

const AdminLayout = ({ children }) => {
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

export default AdminLayout;
