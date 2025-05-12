import { useState, useMemo, useContext } from "react";
import { format } from "date-fns";
import { FaSort } from "react-icons/fa";
import { BiMoney, BiFile } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LoanContext } from "../context/LoanContext";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

const EmptyState = () => (
  <div className="text-center py-16">
    <BiFile className="w-16 h-16 mx-auto text-gray-400 mb-4" />
    <h3 className="text-lg font-medium text-gray-900">No Loans Found</h3>
    <p className="mt-1 text-sm text-gray-500">Get started by applying for a new loan</p>
    <Link to="/appliaction">
        <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
        Apply Now
        </button>
    </Link>
  </div>
);

const LoanTableRow = ({ loan }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-200">
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
      ${loan.amount.toLocaleString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" title={loan.purpose}>
      <div className="truncate max-w-xs">{loan.purpose}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge status={loan.status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {format(new Date(loan.application_date), "MMM dd, yyyy")}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
      {loan.term_months} months
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {loan.approval_date ? format(new Date(loan.approval_date), "MMM dd, yyyy") : "-"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link to="/repayment">
      <button 
        className="text-white bg-blue-600 hover:bg-green-700 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loan.status !== "approved"}
      >
        Repay
      </button>
      </Link>
    </td>
  </tr>
);

const History = () => {
  const { loans } = useContext(LoanContext);  // Loans from context
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedLoans = useMemo(() => {
    let result = [...(loans || [])];  // Fix: if loan is undefined, default to empty array
  
    if (sortField) {
      result.sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortField] > b[sortField] ? 1 : -1;
        }
        return a[sortField] < b[sortField] ? 1 : -1;
      });
    }
  
    return result;
  }, [loans, sortField, sortDirection]);
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BiMoney className="mr-2" /> Loan Applications
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {sortedLoans.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { label: "Amount", field: "amount" },
                      { label: "Purpose", field: "purpose" },
                      { label: "Status", field: "status" },
                      { label: "Application Date", field: "application_date" },
                      { label: "Term", field: "term_months" },
                      { label: "Approval Date", field: "approval_date" },
                      { label: "Actions", field: null }
                    ].map((column) => (
                      <th
                        key={column.field || "actions"}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => column.field && handleSort(column.field)}
                      >
                        <div className="flex items-center">
                          {column.label}
                          {column.field && <FaSort className="ml-1" />}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedLoans.map((loan) => (
                    <LoanTableRow key={loan.id} loan={loan} />
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
