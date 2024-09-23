import { z } from "zod"

const registerSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(8, {
        message: "Email must be at least 8 characters.",
    }).email({ message: "Email is not valid" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export const loginSchema = z.object({
    email: z.string().min(8, {
        message: "Email must be at least 8 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export const transactionsSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    amount: z.number().min(1, {
        message: "Amount must be at least 1 character.",
    }),
});

export const monthlyBudgetSchema = z.object({
    budgetmonth: z.number().min(1, 'Monthly budget must be greater than 0'),
    softmonth: z.boolean(),
    hardmonth: z.boolean(),
});

export const yearlyBudgetSchema = z.object({
    budgetyear: z.number().min(1, 'Yearly budget must be greater than 0'),
    softyear: z.boolean(),
    hardyear: z.boolean(),
});


export default registerSchema