import React, { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";

const LoanApplication = () => {
  const { loanApplication } = useContext(AccountContext);

  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [term_months, setTermmonths] = useState("");
  const [guarantor_username, setGuarantorUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    loanApplication(amount, purpose, term_months, guarantor_username);

    // reset the fields
    setAmount("");
    setPurpose("");
    setTermmonths("");
    setGuarantorUsername("");
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter loan amount"
            />
          </div>

          {/* Purpose */}
          <div>
            <label htmlFor="purpose" className="block text-gray-700 font-medium mb-1">Purpose</label>
            <textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe purpose of the loan"
            ></textarea>
          </div>

          {/* Months */}
          <div>
            <label htmlFor="months" className="block text-gray-700 font-medium mb-1">Loan Period (Months)</label>
            <input
              type="number"
              id="months"
              value={term_months}
              onChange={(e) => setTermmonths(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of months"
            />
          </div>

          {/* Guarantor Username */}
          <div>
            <label htmlFor="guarantorUsername" className="block text-gray-700 font-medium mb-1">Guarantor Username</label>
            <input
              type="text"
              id="guarantorUsername"
              value={guarantor_username}
              onChange={(e) => setGuarantorUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter guarantor's username"
            />
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
