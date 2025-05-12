import React, { useState, useEffect, useContext } from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaChartLine, FaShieldAlt, FaClock } from "react-icons/fa";
import { format } from "date-fns";
import { AccountContext } from "../context/AccountContext";

const Dashboard = () => {

  const {balance, transactions} = useContext(AccountContext)

  

  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [isLoading, setIsLoading] = useState(false);


  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    });
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
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Account Overview */}
          <div className="md:col-span-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Account Overview</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-2">Total Balance</p>
                {balance !== null && balance !== undefined ? (
                  <h1 className={`text-4xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </h1>
                ) : (
                  <p>Loading balance...</p>
                )}
              </div>
              <FaShieldAlt className="text-4xl text-blue-500" />
            </div>
          </div>


          {/* Transaction History */}
          <div className="md:col-span-12 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
            {isLoading ? (
              <div className="text-center py-8">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No transactions to display</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th 
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("date")}
                      >
                        Date
                      </th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th 
                        className="py-3 px-4 text-right cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("amount")}
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTransactions.map((transaction, index) => (
                      <tr 
                        key={transaction.id}
                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-150 ease-in-out cursor-pointer`}
                      >
                        <td className="py-3 px-4">{format(transaction.timestamp, "PP")}</td>
                        <td className="py-3 px-4 capitalize">{transaction.type}</td>
                        <td className={`py-3 px-4 text-right ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"} font-medium`}>
                          ${Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;