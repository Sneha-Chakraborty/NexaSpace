// client/src/components/navigation/PublicNavbar.jsx
import { Link, NavLink } from "react-router-dom";

const PublicNavbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `text-sm hover:text-blue-400 transition-colors ${
      isActive ? "text-blue-400" : "text-gray-200"
    }`;

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black/80 rounded-t-2xl">
      {/* Left: brand icon */}
      <Link
        to="/"
        className="flex items-center gap-2"
        aria-label="NexaSpace Home"
      >
        <div className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-xs uppercase tracking-widest">
          icon
        </div>
        <span className="text-lg font-semibold tracking-wide">NexaSpace</span>
      </Link>

      {/* Right: nav links */}
      <nav className="flex gap-6">
        <NavLink to="/" className={navLinkClasses}>
          Home
        </NavLink>
        <NavLink to="/about" className={navLinkClasses}>
          About
        </NavLink>
        <NavLink to="/help" className={navLinkClasses}>
          Help
        </NavLink>
      </nav>
    </header>
  );
};

export default PublicNavbar;
