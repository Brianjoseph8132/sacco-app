import React, { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";

const Transaction = () => {

  const { addTransactions } = useContext(AccountContext);

  const [action, setAction] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trasanctionamount = parseFloat(amount);

    addTransactions(trasanctionamount, action, pin);

    // reset the fields
    setAction('');
    setAmount('');
    setPin('');
  };

  
  const errors = {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Action */}
          <div>
            <label htmlFor="action" className="block text-gray-700 font-medium mb-1">Action</label>
            <select
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}  
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.action ? 'border-red-500' : ''}`}
            >
              <option value="">Select Action</option>
              <option value="deposit">Deposit</option>  
              <option value="withdraw">Withdraw</option> 
            </select>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : ''}`}
              placeholder="Enter amount"
            />
          </div>

          {/* PIN */}
          <div>
            <label htmlFor="pin" className="block text-gray-700 font-medium mb-1">PIN</label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pin ? 'border-red-500' : ''}`}
              placeholder="Enter your PIN"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Submit Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
