import React, { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { LoanContext } from "../context/LoanContext";
import { FaRegBell, FaCheck, FaTrash } from "react-icons/fa";
import { AdminContext } from "../context/AdminContext";

const AdminNotification = () => {
  const { deleteNotification, markAsRead, markAllAsRead } = useContext(LoanContext);
  const { notification, loanAction } = useContext(AdminContext);

  const [rejectInputShown, setRejectInputShown] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});

  const handleReject = (loan_id, notification_id, reason) => {
    loanAction("reject", reason, loan_id);
    setRejectInputShown((prev) => ({ ...prev, [notification_id]: false }));
    setRejectionReasons((prev) => ({ ...prev, [notification_id]: "" }));
  };

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [loading]);
  

  const getTypeColor = (type) => {
    const normalizedType = type?.toLowerCase();
    switch (normalizedType) {
      case "loan_application":
        return "bg-blue-100 text-blue-800";
      case "loan_approve":
        return "bg-green-100 text-green-800";
      case "admin_loan_alert":
        return "bg-purple-100 text-purple-800";
      case "loan_reject":
        return "bg-red-100 text-indigo-800";
      case "loan_paid":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg p-6 shadow-md">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (notification.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaRegBell className="text-gray-400 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            No notifications
          </h2>
          <p className="text-gray-500 mt-2">You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Mark all as read
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notification.map((n) => {
            const isFinalStatus =
              n.loan_status === "approved" ||
              n.loan_status === "rejected" ||
              n.loan_status === "paid";

            return (
              <div
                key={n.id}
                className={`bg-white rounded-lg p-6 shadow-md transition-all duration-200 ${
                  n.isRead ? "" : "border-l-4 border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h2
                    className={`text-lg ${
                      n.isRead
                        ? "text-gray-700"
                        : "font-semibold text-gray-900"
                    }`}
                  >
                    {n.title}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getTypeColor(
                      n.type
                    )}`}
                  >
                    {n.type}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{n.message}</p>

                {/* Approve/Reject buttons */}
                {n.title === "New Loan Application" && (
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                        onClick={() =>
                          loanAction("approve", "", n.loan_id)
                        }
                        disabled={isFinalStatus}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                        onClick={() =>
                          setRejectInputShown((prev) => ({
                            ...prev,
                            [n.id]: true,
                          }))
                        }
                        disabled={isFinalStatus}
                      >
                        Reject
                      </button>
                    </div>

                    {rejectInputShown[n.id] && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Enter rejection reason"
                          value={rejectionReasons[n.id] || ""}
                          onChange={(e) =>
                            setRejectionReasons((prev) => ({
                              ...prev,
                              [n.id]: e.target.value,
                            }))
                          }
                          className="w-full text-sm p-2 border border-gray-300 rounded"
                          disabled={isFinalStatus}
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                            type="button"
                            onClick={() =>
                              handleReject(
                                n.loan_id,
                                n.id,
                                rejectionReasons[n.id] || "No reason provided"
                              )
                            }
                            disabled={isFinalStatus}
                          >
                            Submit
                          </button>
                          <button
                            className="bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded hover:bg-gray-400"
                            onClick={() => {
                              setRejectInputShown((prev) => ({
                                ...prev,
                                [n.id]: false,
                              }));
                              setRejectionReasons((prev) => ({
                                ...prev,
                                [n.id]: "",
                              }));
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {isFinalStatus && (
                      <div className="text-sm mt-2 font-medium text-gray-500">
                        Status: <span className="capitalize">{n.loan_status}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {format(new Date(n.timestamp), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                  <div className="flex space-x-2">
                    {!n.is_read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                        aria-label="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                      aria-label="Delete notification"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
