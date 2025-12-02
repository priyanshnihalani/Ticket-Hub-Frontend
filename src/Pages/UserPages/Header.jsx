import { useState } from "react";
import { Bell, LogOut, } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutModal from "../../Components/Logout";

// ================= Header With Integrated Logout =================
const Header = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 border-b-2 border-orange-500 pb-1"
      : "text-gray-500 hover:text-orange-500";

  const name = JSON.parse(localStorage.getItem('authDetail')).name
    .split(" ")[0]

  const handleLogoutConfirm = () => {
    localStorage.removeItem('authDetail')
    navigate("/login");
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 pt-4 border-b border-b-gray-200">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66553 11.9951C3.72595 11.9951 4.74294 12.4163 5.49278 13.1661C6.24261 13.916 6.66386 14.933 6.66386 15.9934C6.66386 17.0538 6.24261 18.0708 5.49278 18.8206C4.74294 19.5705 3.72595 19.9917 2.66553 19.9917V22.6573C2.66553 23.3642 2.94636 24.0422 3.44625 24.5421C3.94614 25.042 4.62413 25.3228 5.33108 25.3228H26.6555C27.3625 25.3228 28.0405 25.042 28.5404 24.5421C29.0403 24.0422 29.3211 23.3642 29.3211 22.6573V19.9917C28.2607 19.9917 27.2437 19.5705 26.4938 18.8206C25.744 18.0708 25.3228 17.0538 25.3228 15.9934C25.3228 14.933 25.744 13.916 26.4938 13.1661C27.2437 12.4163 28.2607 11.9951 29.3211 11.9951V9.3295C29.3211 8.62255 29.0403 7.94455 28.5404 7.44466C28.0405 6.94477 27.3625 6.66394 26.6555 6.66394H5.33108C4.62413 6.66394 3.94614 6.94477 3.44625 7.44466C2.94636 7.94455 2.66553 8.62255 2.66553 9.3295V11.9951Z" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M17.3261 6.66394V9.3295" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M17.3261 22.6572V25.3228" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M17.3261 14.6605V17.3261" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">TicketHub</h1>
              <p className="text-sm text-gray-500">Hi, {name} 👋</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => setShowLogout(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="w-full mt-4">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <NavLink to="/user/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/user/my-bookings" className={navClass}>
              My Bookings
            </NavLink>
            <NavLink to="/user/events" className={navClass}>
              Events
            </NavLink>
            <NavLink to="/user/profile" className={navClass}>
              Profile
            </NavLink>
          </ul>
        </nav>
      </header>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Header;