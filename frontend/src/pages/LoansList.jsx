import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { format } from "date-fns";
import { AdminContext } from "../context/AdminContext";

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    paid: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Repayment table
const RepaymentHistoryTable = ({ history }) => {
  if (!history || history.length === 0) {
    return <p className="text-gray-500 italic">No repayment history available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount Paid</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((payment, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">${payment.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{format(new Date(payment.payment_date), "MMM dd, yyyy")}</td>
              <td className="px-6 py-4 whitespace-nowrap">{payment.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Individual loan card
const LoanCard = ({ loan }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <FaUser className="text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold">{loan.member_username}</h3>
          </div>
          <StatusBadge status={loan.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Original Amount</p>
            <p className="font-semibold">${loan.original_amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Purpose</p>
            <p className="font-semibold">{loan.purpose}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Term</p>
            <p className="font-semibold">{loan.term_months} months</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Application Date</p>
            <p className="font-semibold">{format(new Date(loan.application_date), "MMM dd, yyyy")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remaining Balance</p>
            <p className="font-semibold text-red-600">${loan.remaining_balance}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Due</p>
            <p className="font-semibold text-orange-600">${loan.total_due}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Paid</p>
            <p className="font-semibold text-green-600">${loan.total_repaid}</p>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                Hide Repayment History <FaChevronUp className="ml-2" />
              </>
            ) : (
              <>
                Show Repayment History <FaChevronDown className="ml-2" />
              </>
            )}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4">
            <RepaymentHistoryTable history={loan.repayments} />
          </div>
        )}
      </div>
    </div>
  );
};

// Main component
const LoansList = () => {
  const { loanDetails } = useContext(AdminContext);

  if (!loanDetails) {
    return <div>Loading...</div>;
  }

  if (loanDetails.length === 0) {
    return <div className="text-center text-gray-500 p-4">No loans available at the moment.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Loan Details</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loanDetails.map((loan) => (
          <LoanCard key={loan.loan_id} loan={loan} />
        ))}
      </div>
    </div>
  );
};

export default LoansList;
