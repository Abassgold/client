interface TransactionType {
    description: string;
    amount: string;
    type: string;
}
const TransactionCard = ({ description, amount, type }: TransactionType) => {
    return (
        <div className={`flex justify-between items-center p-2 rounded ${type === "debit" ? "bg-red-50" : "bg-green-50"}`}>
            <span className="text-gray-700 text-sm sm:text-base">{description}</span>
            <span className={`${type === "debit" ? "text-red-600" : "text-green-600"} text-sm sm:text-base`}>${amount}</span>
        </div>
    )
}

export default TransactionCard