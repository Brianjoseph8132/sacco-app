import React, { useState } from "react";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    months: "",
    guarantorUsername: "",
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

    // Months validation
    if (formData.months && (+formData.months <= 0 || isNaN(formData.months))) {
      validationErrors.months = "Months must be a valid positive number";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Loan Application Submitted", formData);
      // Reset or send to backend API
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Apply for a Loan</h2>

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
              placeholder="Enter loan amount"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Purpose */}
          <div>
            <label htmlFor="purpose" className="block text-gray-700 font-medium mb-1">Purpose</label>
            <textarea
              id="purpose"
              value={formData.purpose}
              onChange={handleChange}
              rows="3"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.purpose ? 'border-red-500' : ''}`}
              placeholder="Describe purpose of the loan"
            ></textarea>
            {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
          </div>

          {/* Months */}
          <div>
            <label htmlFor="months" className="block text-gray-700 font-medium mb-1">Loan Period (Months)</label>
            <input
              type="number"
              id="months"
              value={formData.months}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.months ? 'border-red-500' : ''}`}
              placeholder="Enter number of months"
            />
            {errors.months && <p className="text-red-500 text-sm mt-1">{errors.months}</p>}
          </div>

          {/* Guarantor Username */}
          <div>
            <label htmlFor="guarantorUsername" className="block text-gray-700 font-medium mb-1">Guarantor Username</label>
            <input
              type="text"
              id="guarantorUsername"
              value={formData.guarantorUsername}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.guarantorUsername ? 'border-red-500' : ''}`}
              placeholder="Enter guarantor's username"
            />
            {errors.guarantorUsername && <p className="text-red-500 text-sm mt-1">{errors.guarantorUsername}</p>}
          </div>

          {/* Apply Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Apply for Loan
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplication;
