import React, { useContext, useState } from "react";
// import { FiHome, FiBell, FiDollarSign, FiUsers, FiSend, FiMenu, FiX, FiLogOut, FiSettings } from "react-icons/fi";
// import { RiMegaphoneLine } from "react-icons/ri";
import { FiHome, FiBell, FiCreditCard, FiUsers, FiSend, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { LoanContext } from "../context/LoanContext";

const AdminDashboard = () => {
  const {unreadCount} = useContext(LoanContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");


  const menuItems = [
    { title: "Dashboard", icon: <FiHome className="text-xl" />, path: "/admin-dashboard" },
    { title: "Notifications", icon: <FiBell className="text-xl" />, path: "/admin-notification", badge: unreadCount },
    { title: "Loans", icon: <FiCreditCard className="text-xl" />, path: "/loans" },
    { title: "Members", icon: <FiUsers className="text-xl" />, path: "/members" },
    { title: "Broadcast", icon: <HiOutlineMegaphone className="text-xl" />, path: "/broadcast" },
    { title: "Send Notification", icon: <FiSend className="text-xl" />, path: "/send-notification" }
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed lg:relative lg:translate-x-0 z-30 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out w-64`}>
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-bold text-gray-800">SMART SACCO Admin</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <FiX className="text-2xl" />
          </button>
        </div>
        <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.title}
            onClick={() => setActiveMenu(item.title)}
            className={`flex items-center px-6 py-3 cursor-pointer relative ${
              activeMenu === item.title ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="mr-4">{item.icon}</span>
            <span>{item.title}</span>
            {item.badge && (
              <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="lg:hidden">
              <FiMenu className="text-2xl" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Total Members</h2>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
              <p className="text-3xl font-bold text-green-600">567</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Total Deposits</h2>
              <p className="text-3xl font-bold text-purple-600">$890,123</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Loan Application</h3>
                      <p className="text-sm text-gray-500">From: Member #{item}</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
