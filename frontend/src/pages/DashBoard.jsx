import React, { useState, useEffect } from "react";
import { FiDollarSign, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const mockTransactions = [
    { id: 1, date: "2024-01-15", type: "deposit", amount: 5000 },
    { id: 2, date: "2024-01-14", type: "withdraw", amount: 1500 },
    { id: 3, date: "2024-01-13", type: "deposit", amount: 3000 },
    { id: 4, date: "2024-01-12", type: "withdraw", amount: 2000 },
    { id: 5, date: "2024-01-11", type: "deposit", amount: 4000 },
    { id: 6, date: "2024-01-10", type: "withdraw", amount: 1000 },
    { id: 7, date: "2024-01-09", type: "deposit", amount: 6000 }
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTransactions(mockTransactions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const WelcomeHeader = () => (
    <div className="p-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        {greeting}, John Doe
      </h1>
      <p className="text-teal-100 text-lg">Welcome to your SACCO Dashboard</p>
    </div>
  );

  const BalanceCard = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transform transition-all hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-600 text-lg">Current Balance</h2>
        <FiDollarSign className="text-teal-500 text-2xl" />
      </div>
      <p className="text-4xl font-bold text-gray-800">$12,500.00</p>
      <p className="text-sm text-gray-500 mt-2">Last updated: Today</p>
    </div>
  );

  const TransactionHistory = () => {
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    if (loading) return <div className="text-center py-8">Loading transactions...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!transactions.length) return <div className="text-center py-8">No transactions found</div>;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Type</th>
                <th className="text-right py-3 px-4 text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-800">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {transaction.type === "deposit" ? (
                        <FiArrowUpRight className="text-green-500 mr-2" />
                      ) : (
                        <FiArrowDownLeft className="text-red-500 mr-2" />
                      )}
                      <span
                        className={`capitalize ${
                          transaction.type === "deposit"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-medium ${
                        transaction.type === "deposit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      ${transaction.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {Math.ceil(transactions.length / transactionsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={indexOfLastTransaction >= transactions.length}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <WelcomeHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <BalanceCard />
          </div>
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;