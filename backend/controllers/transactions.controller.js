import Transaction from '../schemas/transactions.js'
import Year from '../schemas/year.js'
import Month from '../schemas/month.js'

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()

        if (!transactions) {
            return res.status(404).json({ message: 'Transactions did not find' })
        }

        res.status(200).json({ transactions })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getTransaction = async (req, res) => {
    try {
        const { id } = req.params

        const transaction = await Transaction.findById(id)

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction did not find' })
        }

        res.status(200).json({ transaction })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const createTransaction = async (req, res) => {
    try {
        const { name, amount } = req.body

        if (!name || !amount) {
            return res.status(404).json({ message: 'Name or amount is invalid' })
        }

        const newTransaction = await Transaction.create({ name, amount })
        newTransaction.save()

        res.status(200).json({ newTransaction })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params

        const deleteTransaction = await Transaction.deleteOne({ _id: id })

        if (!deleteTransaction) {
            return res.status(404).json({ message: 'Transaction did not find' })
        }

        res.status(200).json({ message: 'Transaction deleted successfully' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const createYear = async (req, res) => {
    try {
        const { budgetyear, softyear, hardyear } = req.body

        if (!budgetyear) {
            return res.status(404).json({ message: 'Year budget did not find' })
        }

        if (!softyear && !hardyear) {
            return res.status(404).json({ message: 'Year type did not find' })
        }

        const newBudget = await Year.create({ yearBudget: budgetyear, softYear: softyear, hardYear: hardyear })

        await newBudget.save();

        return res.status(201).json(newBudget);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const createMonth = async (req, res) => {
    try {
        const { budgetmonth, softmonth, hardmonth } = req.body

        if (!budgetmonth) {
            return res.status(404).json({ message: 'Year budget did not find' })
        }

        if (!softmonth && !hardmonth) {
            return res.status(404).json({ message: 'Year type did not find' })
        }

        const newBudget = await Month.create({ monthBudget: budgetmonth, softMonth: softmonth, hardMonth: hardmonth })

        await newBudget.save();

        return res.status(201).json(newBudget);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getYear = async (req, res) => {
    try {
        const budget = await Year.find()
        console.log(budget)
        res.json(budget)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getMonth = async (req, res) => {
    try {
        const budget = await Month.find()
        console.log(budget)
        res.json(budget)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export {
    getTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    getYear,
    getMonth,
    createMonth,
    createYear
}