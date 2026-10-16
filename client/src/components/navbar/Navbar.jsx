import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown.jsx";

const Navbar = () => {
  const linkStyle = ({ isActive }) =>
    `transition-color-duration-300 ${
      isActive
        ? "text-[#E7C68B] font-semibold pb-1"
        : "text-[#F4EDF4] hover:text-[#C7A6C8]"
    }`;

  return (
    <nav
      className="sticky top-0 z-50 h-16 flex items-center justify-between px-16 text-white"
      style={{ backgroundColor: "#260B20" }}
    >
      {/* Logo */}
      <NavLink to="/" className="text-xl font-bold">
        Stocksy.
      </NavLink>

      {/* Navbar links: hidden on mobile, visible on desktop */}
      <div className="hidden md:flex items-center gap-10">
        <NavLink to="/" end className={linkStyle}>Home</NavLink>
        <NavLink to="/explore" className={linkStyle}>Explore</NavLink>
        <NavLink to="/watchlist" className={linkStyle}>Watchlist</NavLink>
      </div>

      {/* Avatar dropdown: visible on all screen sizes */}
      <div className="flex items-center">
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
