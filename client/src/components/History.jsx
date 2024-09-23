import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Transactions from "./Transactions"
import { useUsers } from "@/store/userSlice"

const History = () => {
    const { transactions, fetchTransactions } = useUsers()

    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("newest")
    const [filteredTransactions, setFilteredTransactions] = useState([])

    useEffect(() => {
        const loadTransactions = async () => {
            await fetchTransactions()
        }
        loadTransactions()
    }, [fetchTransactions])

    useEffect(() => {
        let result = [...transactions]

        if (searchTerm) {
            result = result.filter(transaction =>
                transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filter === "newest") {
            result.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (filter === "oldest") {
            result.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else if (filter === "moreexpensive") {
            result.sort((a, b) => b.amount - a.amount)
        } else if (filter === "cheapest") {
            result.sort((a, b) => a.amount - b.amount)
        }

        setFilteredTransactions(result)
    }, [searchTerm, filter, transactions])

    return (
        <section className="flex flex-col w-1/2 m-auto space-y-8">
            <div>
                <h3 className="text-2xl font-bold mt-8">This month</h3>
            </div>

            <div className="relative">
                <input
                    placeholder="🔍  Search for a transaction..."
                    className="input shadow-lg border border-gray-300 px-5 py-3 rounded-xl w-full transition-all outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <RadioGroup value={filter} onValueChange={(value) => setFilter(value)} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newest" id="r1" />
                    <Label htmlFor="r1">Newest</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oldest" id="r2" />
                    <Label htmlFor="r2">Oldest</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moreexpensive" id="r3" />
                    <Label htmlFor="r3">More expensive</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cheapest" id="r4" />
                    <Label htmlFor="r4">Cheapest</Label>
                </div>
            </RadioGroup>

            <div>
                <Transactions transactions={filteredTransactions} />
            </div>

            <p className="text-center font-semibold text-sm">Copyright ©</p>
        </section>
    )
}

export default History