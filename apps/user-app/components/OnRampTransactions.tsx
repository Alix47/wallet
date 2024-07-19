export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <div className="border p-6 rounded-xl bg-[#ededed]">
            <h1 className="text-xl border-b pb-2">Recent Transactions</h1>
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </div>
    }
    return <div className="border p-6 rounded-xl bg-[#ededed]">
        <h1 className="text-xl border-b pb-2">Recent Transactions</h1>
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between" key={t.amount}>
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </div>
}