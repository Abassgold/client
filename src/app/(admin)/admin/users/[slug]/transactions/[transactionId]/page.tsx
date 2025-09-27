import { cookies } from 'next/headers';
import React from 'react'
import { redirect } from 'next/navigation';
import DownloadReceipt, { myTransaction } from '@/app/(dasboard)/user/transactions/[slug]/DownloadReceipt';


interface myResponseType {
  ok: boolean;
  msg?: string;
  transaction: myTransaction
}
const TransactionId = async ({
  params,
}: {
  params: Promise<{ transactionId: string }>
}) => {

  const token = (await cookies()).get('accessToken')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions/${(await params).transactionId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

if(response.status === 401) redirect('/login')
if(response.status === 403) redirect('/account-suspended')
  if (!response.ok) {
    console.error('Failed to fetch transaction:', response.statusText);
    return <div>Error loading transaction</div>;
  }
  const data :myResponseType= await response.json();

  const transaction = data.transaction
  return (
    <DownloadReceipt transaction={transaction}/>
  )
}


export default TransactionId;