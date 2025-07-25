'use client'
import FinanceSummary from '@/components/admin/finance/FinanceSummary';
import { getToken } from '@/lib/Token';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [finance, setFinance] = useState({
    revenue: 0,
    expense: 0,
    profit: 0
  });

  useEffect(() => {
    const token = getToken();
    const fetchFinance = async () => {
      const today = new Date();
      const month = today.getMonth() + 1; 
      const year = today.getFullYear();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/monthly-finance?month=${month}&year=${year}`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          next: { revalidate: 60 }
        }
      );
      const data = await res.json();
      if (data.ok) {
        setFinance({
          revenue: data.totalRevenue,
          expense: data.totalExpense,
          profit: data.netProfit
        });
      }
    };

    fetchFinance();
  }, []);

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} Finance Summary
      </h1>
      <FinanceSummary
        revenue={finance.revenue}
        expense={finance.expense}
        profit={finance.profit}
      />
    </div>
  );
};

export default Page;
