import React, { useState } from "react";

const Transaction = () => {
  const [formData, setFormData] = useState({
    action: "",
    amount: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    // Validate amount
    if (formData.amount && (+formData.amount <= 0 || isNaN(formData.amount))) {
      validationErrors.amount = "Amount must be a positive number";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Transaction Submitted", formData);
      // Send to backend API here
    }
  };

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
              value={formData.action}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.action ? 'border-red-500' : ''}`}
            >
              <option value="">Select Action</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
            {errors.action && <p className="text-red-500 text-sm mt-1">{errors.action}</p>}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : ''}`}
              placeholder="Enter amount"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* PIN */}
          <div>
            <label htmlFor="pin" className="block text-gray-700 font-medium mb-1">PIN</label>
            <input
              type="password"
              id="pin"
              value={formData.pin}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pin ? 'border-red-500' : ''}`}
              placeholder="Enter your PIN"
            />
            {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
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
