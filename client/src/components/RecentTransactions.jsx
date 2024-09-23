import { useUsers } from "@/store/userSlice";
import { DollarSign } from "lucide-react";
import { useEffect } from "react";

const RecentTransactions = () => {
    const { transactions, fetchTransactions } = useUsers();

    // Fetch transactions when the component mounts
    useEffect(() => {
        fetchTransactions();
    }, []); // fetchTransactions is called only on mount

    // Listen to the transactions in reverse order, taking the last 3
    const recentTransactions = transactions.slice(-3).reverse();

    return (
        Array.isArray(recentTransactions) && recentTransactions.length > 0 ? (
            recentTransactions.map((transaction, i) => {
                const formattedDate = new Date(transaction.date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                return (
                    <div key={i}>
                        <div className='flex items-center space-y-3'>
                            <div className="bg-gray-200 rounded-mainRounded p-4 mr-4">
                                <DollarSign size={30} />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <p className="text-lg">{transaction.name}</p>
                                <strong className='mr-4 text-base'>-{transaction.amount}$</strong>
                                <span className="text-sm">{formattedDate}</span>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <p className='text-center text-lg font-bold'>No transactions yet.</p>
        )
    );
};

export default RecentTransactions;
