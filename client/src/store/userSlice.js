import { profileRequest } from '@/api/fetchData.js'
import { createTransaction, deleteTransaction, getMonth, getTransactions, getYear } from '@/api/fetchTransactions'
import { toastSuccess } from '@/utils/toast'
import { create } from 'zustand'

export const useUsers = create((set) => ({
    user: null,
    loading: true,
    isAuthenticated: false,
    budgetMonth: [],
    budgetYear: [],
    transactions: [],
    fetchUser: async () => {
        try {
            const res = await profileRequest()
            set({ user: res.data.user, loading: false, isAuthenticated: true })
        } catch (error) {
            console.error(error)
            set({ loading: false, isAuthenticated: false })
        }
    },
    fetchTransactions: async () => {
        try {
            const res = await getTransactions()
            set({ transactions: res.data.transactions })
        } catch (error) {
            console.log(error)
        }
    },
    createTransaction: async (newTransactionData) => {
        try {
            const res = await createTransaction(newTransactionData);
            set((state) => ({
                transactions: [res.data, ...state.transactions]
            }));
            toastSuccess({ title: 'Transaction created successfully!' });
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    },
    deleteTransaction: async (id) => {
        try {
            await deleteTransaction(id);
            set((state) => ({
                transactions: state.transactions.filter((transaction) => transaction._id !== id)
            }));
            toastSuccess({ title: 'Transaction deleted successfully!' });
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    },
    fetchMonthBudget: async () => {
        try {
            const res = await getMonth()
            const lastBudget = res.data.length > 0 ? res.data[res.data.length - 1] : null;
            set({ budgetMonth: lastBudget });
        } catch (error) {
            console.log(error)
        }
    },
    fetchYearBudget: async () => {
        try {
            const res = await getYear()
            const lastBudget = res.data.length > 0 ? res.data[res.data.length - 1] : null;
            set({ budgetYear: lastBudget });
        } catch (error) {
            console.log(error)
        }
    },
    clearUser: () => set({ user: null, loading: true, isAuthenticated: false }),
    startLoading: () => set({ loading: true }),
    stopLoading: () => set({ loading: false })
}))