'use client'
import React, { useState } from "react";
import  { transactionType } from "./TransactionList";
interface trans{
    transaction: transactionType
} 
 const Transactions = ({ transaction }:trans) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="flex flex-col space-y-1 md:flex-row md:space-x-6 md:space-y-0">
          <div>
            <p className="text-sm font-semibold text-gray-700">Transaction ID</p>
            <p className="text-gray-500">{transaction.transactionId}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Date</p>
            <p className="text-gray-500">{new Date(transaction?.updatedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Beneficiary</p>
            <p className="text-gray-500">{transaction.beneficiary}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Service Type</p>
            <p className="text-gray-500">{transaction.serviceType}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-1 text-right md:text-left md:flex-row md:items-center md:space-x-6 md:space-y-0">
          <div>
            <p className="text-sm font-semibold text-gray-700">Amount</p>
            <p
              className={`font-semibold ${
                transaction.type === "debit" ? "text-red-600" : "text-green-600"
              }`}
            >
              {transaction.type === "debit" ? "-" : "+"}₦
              {transaction.amount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Fee</p>
            <p className="text-gray-500">₦{transaction.fee.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Status</p>
            <p
              className={`font-semibold capitalize ${
                transaction.status === "completed"
                  ? "text-green-600"
                  : transaction.status === "pending"
                  ? "text-yellow-500"
                  : "text-red-600"
              }`}
            >
              {transaction.status}
            </p>
          </div>
        </div>
      </div>

      {transaction.remarks && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">Remarks</p>
          <p className="text-gray-600">{transaction.remarks}</p>
        </div>
      )}

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-4 text-blue-600 hover:text-blue-800 font-semibold text-sm focus:outline-none"
      >
        {showDetails ? "Hide Details ▲" : "Show Details ▼"}
      </button>

      {showDetails && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-gray-700 text-sm">
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(transaction.details, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
export default Transactions