import React, { useContext, useState } from "react";
import { FaCheckCircle, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import { format } from "date-fns";
import { LoanContext } from "../context/LoanContext";

const Notification = () => {



    const {notifications,deleteNotification, markAsRead, markAllAsRead, setNotifications} = useContext(LoanContext);
  

  
  const [selectedType, setSelectedType] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeColor = (type) => {
    switch (type) {
      case "loan_application":
        return "bg-blue-100 text-blue-800";
      case "admin_loan_alert":
        return "bg-green-100 text-green-800";
      case "loan_approve":
        return "bg-purple-100 text-purple-800";
      case "loan_paid":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleDelete = (notification) => {
    setSelectedNotification(notification);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedNotification) {
      deleteNotification(selectedNotification.id);
      setShowDeleteModal(false);
    }
  };

  const filteredNotifications = notifications
    .filter((n) => selectedType === "All" || n.type === selectedType);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600 mt-1">{unreadCount} unread notifications</p>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Mark all as read
            </button>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative">
              <select
                className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="loan_approve">Loan Update</option>
                <option value="loan_paid">Repayment</option>
                <option value="admin_loan_alert">System Message</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 transition duration-200 ${notification.isRead ? "bg-white" : "bg-blue-50"}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className={`text-lg ${notification.isRead ? "font-medium" : "font-bold"} text-gray-800`}>
                        {notification.title}
                      </h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">{notification.message}</p>
                    <p className="mt-2 text-sm text-gray-500">
                     {format(new Date(notification.timestamp), "PPP")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition duration-200"
                        aria-label="Mark as read"
                      >
                        <FaCheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-200"
                      aria-label="Delete notification"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No notifications found
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800">Delete Notification</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete this notification? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
