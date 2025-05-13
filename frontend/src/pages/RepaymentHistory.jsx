import React, { useContext, useState, useEffect } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";
import { format } from "date-fns";
import { LoanContext } from "../context/LoanContext";
import { useParams } from "react-router-dom";

const RepaymentHistory = () => {
  const { loan_id } = useParams();
  const { repayments, loanDetails, fetchRepaymentHistory } = useContext(LoanContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRepaymentHistory(loan_id);
  }, [loan_id]);
  const getPaymentIcon = (method) => {
    switch (method) {
      case "credit_card":
        return <FaCreditCard className="text-blue-500" />;
      case "bank_transfer":
        return <FaMoneyBillWave className="text-green-500" />;
      case "paypal":
        return <FaPaypal className="text-blue-600" />;
      default:
        return null;
    }
  };

  const LoadingState = () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-8">
      <p className="text-gray-500 text-lg">No repayment history found</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Loan Repayment History</h1>
        <p className="text-gray-600 text-lg">Track your loan payments and remaining balance</p>
      </div>

      {loading ? (
        <LoadingState />
      ) : repayments.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid So Far</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {repayments.map((item, index) => (
                <tr
                  key={item.repayment_id}
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${loanDetails.loan_amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {loanDetails.interest_rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${loanDetails.loan_total_with_interest?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    ${item.amount_paid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    ${item.balance_remaining.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(item.payment_date), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      {getPaymentIcon(item.payment_method)}
                      {item.payment_method.replace("_", " ").toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    ${item.total_paid_so_far.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RepaymentHistory;



// import React, { useState, useMemo } from "react";
// import { FaSearch, FaFileExport, FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";
// import { format } from "date-fns";

// const RepaymentHistory = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const dummyData = [
//     {
//       id: 1,
//       loanAmount: 50000,
//       interest: 2500,
//       totalAmount: 52500,
//       amountPaid: 30000,
//       balanceRemaining: 22500,
//       paymentDate: new Date("2024-01-15"),
//       paymentMethod: "credit_card",
//       totalPaidSoFar: 30000
//     },
//     {
//       id: 2,
//       loanAmount: 75000,
//       interest: 3750,
//       totalAmount: 78750,
//       amountPaid: 45000,
//       balanceRemaining: 33750,
//       paymentDate: new Date("2024-01-10"),
//       paymentMethod: "bank_transfer",
//       totalPaidSoFar: 45000
//     },
//     {
//       id: 3,
//       loanAmount: 25000,
//       interest: 1250,
//       totalAmount: 26250,
//       amountPaid: 26250,
//       balanceRemaining: 0,
//       paymentDate: new Date("2024-01-05"),
//       paymentMethod: "paypal",
//       totalPaidSoFar: 26250
//     }
//   ];

//   const filteredData = useMemo(() => {
//     return dummyData.filter(item =>
//       Object.values(item).some(
//         value =>
//           value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm]);

//   const getPaymentIcon = (method) => {
//     switch (method) {
//       case "credit_card":
//         return <FaCreditCard className="text-blue-500" />;
//       case "bank_transfer":
//         return <FaMoneyBillWave className="text-green-500" />;
//       case "paypal":
//         return <FaPaypal className="text-blue-600" />;
//       default:
//         return null;
//     }
//   };

//   const handleExport = () => {
//     // Export functionality implementation
//     console.log("Exporting data...");
//   };

//   const LoadingState = () => (
//     <div className="flex items-center justify-center p-8">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   const EmptyState = () => (
//     <div className="text-center py-8">
//       <p className="text-gray-500 text-lg">No repayment history found</p>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Loan Repayment History</h1>
//         <p className="text-gray-600 text-lg">Track your loan payments and remaining balance</p>
//       </div>

//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search transactions..."
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <FaSearch className="absolute left-3 top-3 text-gray-400" />
//         </div>
//         <button
//           onClick={handleExport}
//           className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           <FaFileExport />
//           Export Data
//         </button>
//       </div>

//       {loading ? (
//         <LoadingState />
//       ) : filteredData.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-lg shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Remaining</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid So Far</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredData.map((item, index) => (
//                 <tr
//                   key={item.id}
//                   className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${item.loanAmount.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${item.interest.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     ${item.totalAmount.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
//                     ${item.amountPaid.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
//                     ${item.balanceRemaining.toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {format(item.paymentDate, "MMM dd, yyyy")}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center gap-2">
//                       {getPaymentIcon(item.paymentMethod)}
//                       {item.paymentMethod.replace("_", " ").toUpperCase()}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
//                     ${item.totalPaidSoFar.toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RepaymentHistory;
