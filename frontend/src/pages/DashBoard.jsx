import React, { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const DashBoard = () => {
  const [filter, setFilter] = useState("All");

  // Dummy transaction data
  const transactions = [
    { date: "2025-05-10", action: "Deposit", amount: 5000 },
    { date: "2025-05-09", action: "Withdraw", amount: 2000 },
    { date: "2025-05-08", action: "Deposit", amount: 3000 },
  ];

  // Filter logic
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.action === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, John Doe 👋</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Current Balance</h2>
          <p className="text-3xl font-bold text-green-600">Ksh 12,500</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-wrap items-center space-x-4">
          {["All", "Deposit", "Withdraw"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl p-6 shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction History</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-4 py-2 text-gray-600">Date</th>
              <th className="px-4 py-2 text-gray-600">Action</th>
              <th className="px-4 py-2 text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{t.date}</td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  {t.action === "Deposit" ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span
                    className={`font-medium ${
                      t.action === "Deposit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.action}
                  </span>
                </td>
                <td className="px-4 py-2">Ksh {t.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <p className="text-center text-gray-500 py-4">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
