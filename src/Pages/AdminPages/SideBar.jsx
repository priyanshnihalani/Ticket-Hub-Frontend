import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, Ticket, LogOut } from "lucide-react";
import LogoutModal from "../../Components/Logout";
import { useState } from "react";
const SideBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate()
  
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Bookings", icon: Calendar, path: "/admin/bookings" },
    { name: "Events", icon: Ticket, path: "/admin/events" },
  ];

  const handleLogoutConfirm = () => {
    localStorage.removeItem('authDetail')
    navigate("/login");
  };

  return (
    <>
      <aside className="w-72 h-screen bg-white  flex flex-col  shadow-lg">
        {/* Top Profile Section */}
        <div className="p-5 border-b">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66553 11.9951C3.72595 11.9951 4.74294 12.4163 5.49278 13.1661C6.24261 13.916 6.66386 14.933 6.66386 15.9934C6.66386 17.0538 6.24261 18.0708 5.49278 18.8206C4.74294 19.5705 3.72595 19.9917 2.66553 19.9917V22.6573C2.66553 23.3642 2.94636 24.0422 3.44625 24.5421C3.94614 25.042 4.62413 25.3228 5.33108 25.3228H26.6555C27.3625 25.3228 28.0405 25.042 28.5404 24.5421C29.0403 24.0422 29.3211 23.3642 29.3211 22.6573V19.9917C28.2607 19.9917 27.2437 19.5705 26.4938 18.8206C25.744 18.0708 25.3228 17.0538 25.3228 15.9934C25.3228 14.933 25.744 13.916 26.4938 13.1661C27.2437 12.4163 28.2607 11.9951 29.3211 11.9951V9.3295C29.3211 8.62255 29.0403 7.94455 28.5404 7.44466C28.0405 6.94477 27.3625 6.66394 26.6555 6.66394H5.33108C4.62413 6.66394 3.94614 6.94477 3.44625 7.44466C2.94636 7.94455 2.66553 8.62255 2.66553 9.3295V11.9951Z" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.3261 6.66394V9.3295" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.3261 22.6572V25.3228" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.3261 14.6605V17.3261" stroke="white" stroke-width="2.66556" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500">Admin User</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all ${isActive
                  ? "bg-orange-50 text-orange-500 font-semibold"
                  : "text-gray-400 hover:bg-gray-100"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-5">
          <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            onClick={() => setShowLogout(true)}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default SideBar;