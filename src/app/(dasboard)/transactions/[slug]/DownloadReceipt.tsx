'use client';

import React, { useRef } from 'react';
import { transactionType } from "@/components/dashboard/transactions/TransactionList";

interface DownloadReceiptProps {
  transaction?: transactionType;
}

const DownloadReceipt = ({ transaction }: DownloadReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!receiptRef.current) return;

    // const opt = {
    //   margin: 0.2,
    //   filename: `FloZap-Receipt-${transaction?.transactionId}.pdf`,
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    // };

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-1 md:px-4">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6">
        <div ref={receiptRef}>
          <h1 className="md:text-3xl font-bold text-teal-800 text-center mb-6">
            FLOZAP Transaction Receipt
          </h1>

          <div className="space-y-4">
            {[
              ['Transaction ID', transaction?.transactionId],
              ['Date', transaction?.updatedAt ? new Date(transaction.updatedAt).toLocaleString() : 'N/A'],
              ['Beneficiary', transaction?.beneficiary],
              ['Service Type', transaction?.serviceType],
              ['Amount', `₦${transaction?.amount.toLocaleString()}`],
              ['Fee', `₦${transaction?.fee.toLocaleString()}`],
              ['Status', transaction?.status],
              ['Type', transaction?.type],
              ['Remarks', transaction?.remarks],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">{label}:</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}

            {Object.entries(transaction?.details || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between text-gray-900">
                <span className="capitalize">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="mt-6 w-full cursor-pointer bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 font-semibold"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default DownloadReceipt;
