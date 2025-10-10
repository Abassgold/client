'use client';
import React, { useRef } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  RefreshCcwIcon,
  PrinterIcon,
  DownloadIcon,
  ArrowLeftIcon,
} from 'lucide-react';
import Link from 'next/link'
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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui copy/Card';
import { Button } from '@/components/ui copy/Button'
import { Badge } from '@/components/ui copy/Badge';
interface DownloadReceiptProps {
  transaction?: myTransaction;
}

const DownloadReceipt = ({ transaction }: DownloadReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!transaction) {
    return (
      <div className="text-center mt-10">
        <XCircleIcon size={64} className="mx-auto text-red-600 dark:text-red-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          Transaction Not Found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The transaction you are looking for does not exist or has been removed.
        </p>
        <Link href="/transactions">
          <Button className="mt-6">
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Transactions
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon size={48} className="text-green-600 dark:text-green-400" />;
      case 'pending':
        return <ClockIcon size={48} className="text-yellow-600 dark:text-yellow-400" />;
      case 'failed':
        return <XCircleIcon size={48} className="text-red-600 dark:text-red-400" />;
      case 'refunded':
        return <RefreshCcwIcon size={48} className="text-blue-600 dark:text-blue-400" />;
      default:
        return null;
    }
  };

  const handlePrint = () => {
    if (receiptRef.current) {
      const printContent = receiptRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = `
        <div style="padding: 20px;">
          <style>
            body { font-family: Arial, sans-serif; }
            .receipt-header { text-align: center; margin-bottom: 20px; }
            .receipt-item { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 8px 0; }
            .receipt-label { font-weight: bold; }
            .receipt-status-completed { color: green; }
            .receipt-status-pending { color: orange; }
            .receipt-status-failed { color: red; }
            .receipt-status-refunded { color: blue; }
          </style>
          <div class="receipt-header">
            <h1>FloZap Transaction Receipt</h1>
          </div>
          ${printContent}
        </div>
      `;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 md:p-8">
      <div className="flex items-center justify-between">
        <Link
          href="/user/transactions"
          className="flex items-center text-teal-700 hover:text-teal-800 dark:text-teal-500 dark:hover:text-teal-400"
        >
          <ArrowLeftIcon size={16} className="mr-2 dark:text-white" />
          Back to Transactions
        </Link>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <PrinterIcon size={16} className="mr-2" />
            Print
          </Button>
          <Button>
            <DownloadIcon size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{getStatusIcon(transaction.status)}</div>
          <CardTitle className="text-2xl">Transaction Receipt</CardTitle>
          <div className="mt-2">
            <Badge
              variant={
                transaction.status === 'completed'
                  ? 'success'
                  : transaction.status === 'pending'
                    ? 'warning'
                    : transaction.status === 'refunded'
                      ? 'info'
                      : 'danger'
              }
              size="lg"
            >
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4"
            ref={receiptRef}
          >
            {[
              ['Reference ID', transaction.reference],
              [
                'Date & Time',
                new Date(transaction.createdAt).toLocaleString(),
              ],
              ['Service Type', transaction.serviceType],
              ['Sender', transaction.sender],
              ['Beneficiary', transaction.beneficiary],
              [
                'Amount',
                `${transaction.type === 'credit' ? '+' : '-'}₦${transaction.amount.toLocaleString()}`,
              ],
              ['Fee', `₦${transaction.fee.toLocaleString()}`],
              [
                'Type',
                transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
              ],
              ['Remarks', transaction.remarks || '—'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
              >
                <span className="font-medium text-gray-600 dark:text-gray-400">{label}</span>
                <span
                  className={`${label === 'Amount' && transaction.type === 'credit'
                      ? 'text-green-600 dark:text-green-400 font-semibold'
                      : 'text-gray-900 dark:text-white'
                    }`}
                >
                  {value}
                </span>
              </div>
            ))}

            <div className="mt-6">
              <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-3">
                Additional Details
              </h3>
              <div className="bg-white dark:bg-gray-900 rounded-md p-4 border border-gray-200 dark:border-gray-700">
                {Object.entries(transaction.details || {}).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <span className="font-medium text-gray-600 dark:text-gray-400 capitalize">
                      {key}
                    </span>
                    <span className="text-gray-900 dark:text-white">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-gray-200 dark:border-gray-800 pt-4">
          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            <p>
              For any issues with this transaction, please contact our support team.
            </p>
            <p className="mt-1">FloZap Technologies</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DownloadReceipt;
