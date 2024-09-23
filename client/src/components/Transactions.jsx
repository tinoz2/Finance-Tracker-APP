import ShowTransaction from './ShowTransaction'

const Transactions = ({ transactions }) => {
    return (
        <section className='max-h-[35rem] overflow-y-auto space-y-6 p-4'>
            {Array.isArray(transactions) && transactions.length > 0 ? (
                transactions.map((transaction, i) => (
                    <ShowTransaction
                        key={i}
                        transaction={transaction}
                        i={i}
                    />
                ))
            ) : (
                <p className='text-center text-lg font-bold'>No transactions yet.</p>
            )}
        </section>
    );
};

export default Transactions;