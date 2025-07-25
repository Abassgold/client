import React from "react";
export type FinanceSummaryProps = {
  revenue: number;
  expense: number;
  profit: number;
};

const FinanceSummary = ({ revenue, expense, profit }: FinanceSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Revenue Card */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 shadow">
        <h2 className="text-lg md:text-xl font-semibold text-green-700">Total Revenue</h2>
        <p className="text-2xl md:text-3xl font-bold text-green-900 mt-2">₦{revenue.toLocaleString()}</p>
      </div>

      {/* Expense Card */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow">
        <h2 className="text-lg md:text-xl font-semibold text-red-700">Total Expenses</h2>
        <p className="text-2xl md:text-3xl font-bold text-red-900 mt-2">₦{expense.toLocaleString()}</p>
      </div>

      {/* Net Profit Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow">
        <h2 className="text-lg md:text-xl font-semibold text-blue-700">Net Profit</h2>
        <p className="text-2xl md:text-3xl font-bold text-blue-900 mt-2">₦{profit.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FinanceSummary;
