import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { LoanContext } from "../context/LoanContext";

const Repayment = () => {
  
  const { loan_id } = useParams();

  const { addRepayment } = useContext(LoanContext);

  const [amount, setAmount] = useState("");
  const [payment_method, setPaymentmethod] = useState("");

  const errors = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    addRepayment(loan_id,amount, payment_method);

    // reset the fields
    setAmount("");
    setPaymentmethod("");
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter repayment amount"
            />
          </div>

          {/* Repayment Method */}
          <div>
            <label htmlFor="repaymentMethod" className="block text-gray-700 font-medium mb-1">Repayment Method</label>
            <select
              id="repaymentMethod"
              value={payment_method}
              onChange={(e) => setPaymentmethod(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Repayment Method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Cash">Cash</option>
            </select>
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
