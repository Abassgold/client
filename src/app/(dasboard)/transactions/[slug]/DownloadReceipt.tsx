'use client';

import React, { useRef } from 'react';

export interface myTransaction {
  
  sender: string;
  beneficiary: string;
  serviceType: string;
  amount: number;
  fee: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'credit' | 'debit';
  remarks?: string;
  reference: string;
  details: Record<string, unknown>;
  createdAt: Date;
}
interface DownloadReceiptProps {
  transaction?: myTransaction;
}

const DownloadReceipt = ({ transaction }: DownloadReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  // const handleDownload = () => {
  //   if (!receiptRef.current) return;
  // };

  return (
    <div className="min-h-screen  bg-gray-100 py-10 px-1 md:px-4">
      <div className="bg-white max-w-lg mx-auto w-full rounded-lg shadow-lg p-6">
        <div ref={receiptRef}>
          <h1 className="md:text-3xl font-bold text-teal-800 text-center mb-6">
            FLOZAP Transaction Receipt
          </h1>

          <div className="space-y-4">
            {[
              ['Ref ID', transaction?.reference],
              ['Date', transaction?.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'N/A'],
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
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReceipt;
