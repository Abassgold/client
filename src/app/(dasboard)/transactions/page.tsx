import TransactionList, { transactionType } from "@/components/dashboard/transactions/TransactionList";
import { cookies } from "next/headers";
export interface fetchTransactions{
    ok: boolean;
    msg?: string;
    transactions?: transactionType[];
    transaction?: transactionType;
}
const Transactions = async () => {
    const token = (await cookies()).get('accessToken')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions/me`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        {
   const data:fetchTransactions = await response.json();
    if (!response.ok) {
        console.error('Failed to fetch transactions:', data);
        return <div>Error loading transactions</div>;
    }
    const allTransactions: transactionType[] = data.transactions || [];
    return (
        <>
            <TransactionList transaction={ allTransactions} />
        </>
    )
}
}

export default Transactions;