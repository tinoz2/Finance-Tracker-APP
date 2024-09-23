import { LineProgress, LineProgressBar, LineProgressText } from 'keep-react'
import { useUsers } from '@/store/userSlice'
import { useEffect } from 'react'

const Goals = () => {
    const { fetchMonthBudget, budgetMonth, fetchYearBudget, budgetYear, transactions, fetchTransactions } = useUsers();

    useEffect(() => {
        const loadBudget = async () => {
            await fetchMonthBudget();
            await fetchYearBudget();
            await fetchTransactions();
        };
        loadBudget();
    }, []);

    const typeBudgetMonth = budgetMonth.hardMonth ? 'Hard' : 'Soft';
    const typeBudgetYear = budgetYear.hardYear ? 'Hard' : 'Soft';
    const spentMoney = transactions.reduce((total, t) => total + t.amount, 0);
    const remainingMoneyMonth = budgetMonth.monthBudget - spentMoney;
    const remainingMoneyYear = budgetYear.yearBudget - spentMoney;

    const progressMonth = budgetMonth.monthBudget > 0 ? (spentMoney / budgetMonth.monthBudget) * 100 : 0;
    const progressYear = budgetYear.yearBudget > 0 ? (spentMoney / budgetYear.yearBudget) * 100 : 0;

    const displayProgressMonth = progressMonth > 100 ? -(progressMonth - 100) : progressMonth;
    const displayProgressYear = progressYear > 100 ? -(progressYear - 100) : progressYear;

    const message = remainingMoneyMonth >= 0 ? 'You are doing good 🥳' : 'You gotta save up more 💰';

    return (
        <section className="w-1/2 m-auto space-y-12">
            <div className="mt-6">
                <p className="mb-2 text-sm font-semibold italic">Monthly <span>({typeBudgetMonth})</span></p>
                <div className="flex flex-wrap gap-3">
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-center text-center">
                        <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${budgetMonth.monthBudget}</p>
                        <p className="text-[#617489] text-sm font-normal">Total budget</p>
                    </div>
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-center text-center">
                        <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${spentMoney}</p>
                        <p className="text-[#617489] text-sm font-normal">Spent</p>
                    </div>
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-center text-center">
                        <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${remainingMoneyMonth}</p>
                        <p className="text-[#617489] text-sm font-normal">Remaining</p>
                    </div>
                </div>
                <div className="mt-4">
                    <LineProgress progress={Math.abs(displayProgressMonth)}>
                        <LineProgressBar lineBackground={`${displayProgressMonth < 0 ? "bg-red-100" : "bg-green-200"}`} className={`${displayProgressMonth < 0 ? "bg-red-500" : "bg-green-500"}`} />
                        <LineProgressText className={`ml-2 ${displayProgressMonth < 0 ? "text-red-500" : "text-green-500"}`}>
                            {displayProgressMonth.toFixed(1)}%
                        </LineProgressText>
                    </LineProgress>
                </div>
            </div>

            <div className="mt-4">
                <p className="mb-2 text-sm font-semibold italic">Yearly <span>({typeBudgetYear})</span></p>
                <div className="flex flex-wrap gap-3">
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-center text-center">
                        <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${budgetYear.yearBudget}</p>
                        <p className="text-[#617489] text-sm font-normal">Total budget</p>
                    </div>
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-center text-center">
                        <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${spentMoney}</p>
                        <p className="text-[#617489] text-sm font-normal">Spent</p>
                    </div>
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-center text-center">
                        <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${remainingMoneyYear}</p>
                        <p className="text-[#617489] text-sm font-normal">Remaining</p>
                    </div>
                </div>
                <div className="mt-4">
                    <LineProgress progress={Math.abs(displayProgressYear)}>
                        <LineProgressBar lineBackground={`${displayProgressYear < 0 ? "bg-red-100" : "bg-green-200"}`} className={`${displayProgressYear < 0 ? "bg-red-500" : "bg-green-500"}`} />
                        <LineProgressText className={`ml-2 ${displayProgressYear < 0 ? "text-red-500" : "text-green-500"}`}>
                            {displayProgressYear.toFixed(1)}%
                        </LineProgressText>
                    </LineProgress>
                </div>
            </div>

            <span className="text-center flex justify-center mt-2 items-center text-lg font-semibold">{message}</span>
        </section>
    );
};

export default Goals;
