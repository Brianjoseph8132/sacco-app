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
    { title: "Notifications", icon: <FiBell className="text-xl" />, path: "/notifications", badge: unreadCount },
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
          <h1 className="text-xl font-bold text-gray-800">SACCO Admin</h1>
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

















// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const [notifications] = useState(5);

//   const menuItems = [
//     { title: "Dashboard", icon: <FiHome className="w-5 h-5" /> },
//     { title: "Notifications", icon: <FiBell className="w-5 h-5" />, badge: notifications },
//     { title: "Loans", icon: <FiDollarSign className="w-5 h-5" /> },
//     { title: "Members", icon: <FiUsers className="w-5 h-5" /> },
//     { title: "Broadcast", icon: <RiMegaphoneLine className="w-5 h-5" /> },
//     { title: "Send Notification", icon: <FiSend className="w-5 h-5" /> }
//   ];

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
//         <div className="p-4 flex items-center justify-between">
//           <h2 className={`${!isSidebarOpen ? "hidden" : "block"} font-bold text-xl text-gray-800`}>SACCO Admin</h2>
//           <button
//             onClick={toggleSidebar}
//             className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
//           >
//             {isSidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
//           </button>
//         </div>

//         <nav className="mt-8">
//           {menuItems.map((item) => (
//             <div
//               key={item.title}
//               onClick={() => setActiveTab(item.title)}
//               className={activeTab === item.title ? "flex items-center p-4 cursor-pointer transition-colors bg-blue-500 text-white" : "flex items-center p-4 cursor-pointer transition-colors text-gray-600 hover:bg-gray-100"}
//             >
//               <div className="flex items-center justify-center">{item.icon}</div>
//               {isSidebarOpen && (
//                 <span className="ml-4 font-medium">
//                   {item.title}
//                   {item.badge && (
//                     <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
//                       {item.badge}
//                     </span>
//                   )}
//                 </span>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-end p-4">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <FiBell className="w-6 h-6 text-gray-600 cursor-pointer" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
//                   {notifications}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
//                 <img
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                   alt="Admin"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-medium text-gray-700">John Doe</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Members</h3>
//               <p className="text-3xl font-bold text-blue-600">2,543</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Loans</h3>
//               <p className="text-3xl font-bold text-green-600">1,123</p>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Savings</h3>
//               <p className="text-3xl font-bold text-purple-600">$1.2M</p>
//             </div>
//           </div>

//           <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
//             <div className="space-y-4">
//               {[1, 2, 3].map((item) => (
//                 <div key={item} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                       <FiUsers className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">New member registration</p>
//                       <p className="text-sm text-gray-500">2 hours ago</p>
//                     </div>
//                   </div>
//                   <span className="text-blue-600 font-medium">View</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;