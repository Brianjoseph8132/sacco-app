import React, { useState } from "react";

const Repayment = () => {
  const [formData, setFormData] = useState({
    amount: "",
    repaymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Required fields check
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    // Amount validation
    if (formData.amount && (+formData.amount <= 0 || isNaN(formData.amount))) {
      validationErrors.amount = "Amount must be a positive number";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Repayment Submitted", formData);
      // Reset or send to backend API
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Loan Repayment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : ''}`}
              placeholder="Enter repayment amount"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Repayment Method */}
          <div>
            <label htmlFor="repaymentMethod" className="block text-gray-700 font-medium mb-1">Repayment Method</label>
            <select
              id="repaymentMethod"
              value={formData.repaymentMethod}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.repaymentMethod ? 'border-red-500' : ''}`}
            >
              <option value="">Select Repayment Method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Cash">Cash</option>
            </select>
            {errors.repaymentMethod && <p className="text-red-500 text-sm mt-1">{errors.repaymentMethod}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Submit Repayment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Repayment;
