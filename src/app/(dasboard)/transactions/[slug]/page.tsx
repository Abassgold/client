import { cookies } from 'next/headers';
import React from 'react'
import DownloadReceipt, { myTransaction } from './DownloadReceipt';


interface myResponseType {
  ok: boolean;
  msg?: string;
  transaction: myTransaction
}
const TransactionId = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const token = (await cookies()).get('accessToken')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions/${(await params).slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  const data :myResponseType= await response.json();


  if (!response.ok) {
    console.error('Failed to fetch transaction:', response.statusText);
    return <div>Error loading transaction</div>;
  }
  const transaction = data.transaction
  return (
    <DownloadReceipt transaction={transaction}/>
  )
}


export default TransactionId;