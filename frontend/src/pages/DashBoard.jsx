import React, { useState, useContext } from "react";
import { FaShieldAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { AccountContext } from "../context/AccountContext";

const ITEMS_PER_PAGE = 5;

const Dashboard = () => {
  const { balance, transactions } = useContext(AccountContext);

  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
    setCurrentPage(1);
  };

  const sortedTransactions = Array.isArray(transactions)
    ? [...transactions].sort((a, b) => {
        if (sortConfig.key === "date") {
          return sortConfig.direction === "asc"
            ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        return sortConfig.direction === "asc"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      })
    : [];

  const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE));
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPrev = () => setCurrentPage((p) => (p === 1 ? totalPages : p - 1));
  const goToNext = () => setCurrentPage((p) => (p === totalPages ? 1 : p + 1));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: 12, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Account Overview */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-8 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Account Overview</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-2">Total Balance</p>
                {balance !== null && balance !== undefined ? (
                  <motion.h1
                    key={balance}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`text-4xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </motion.h1>
                ) : (
                  <p>Loading balance...</p>
                )}
              </div>
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                <FaShieldAlt className="text-4xl text-blue-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-12 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>

            {isLoading ? (
              <div className="text-center py-8 text-gray-400">Loading transactions...</div>
            ) : sortedTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No transactions to display</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th
                          className="py-3 px-4 text-left cursor-pointer hover:bg-gray-50 select-none"
                          onClick={() => handleSort("date")}
                        >
                          Date{" "}
                          {sortConfig.key === "date" && (
                            <span className="text-blue-400 ml-1">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th
                          className="py-3 px-4 text-right cursor-pointer hover:bg-gray-50 select-none"
                          onClick={() => handleSort("amount")}
                        >
                          Amount{" "}
                          {sortConfig.key === "amount" && (
                            <span className="text-blue-400 ml-1">
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence mode="wait">
                        {paginatedTransactions.map((transaction, index) => (
                          <motion.tr
                            key={`${transaction.id}-${currentPage}`}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ delay: index * 0.05 }}
                            className={`${
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-blue-50 transition-colors duration-150 ease-in-out cursor-pointer`}
                          >
                            <td className="py-3 px-4">
                              {format(transaction.timestamp, "PP")}
                            </td>
                            <td className="py-3 px-4 capitalize">{transaction.type}</td>
                            <td
                              className={`py-3 px-4 text-right font-medium ${
                                transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              ${Math.abs(transaction.amount).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
                >
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-700">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                      {Math.min(currentPage * ITEMS_PER_PAGE, sortedTransactions.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-700">
                      {sortedTransactions.length}
                    </span>{" "}
                    transactions
                  </p>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToPrev}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors duration-150 shadow-sm"
                    >
                      <FaChevronLeft className="text-xs" />
                      Previous
                    </motion.button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-150 ${
                            currentPage === page
                              ? "bg-blue-500 text-white shadow-md"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                          }`}
                        >
                          {page}
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToNext}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors duration-150 shadow-sm"
                    >
                      Next
                      <FaChevronRight className="text-xs" />
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;