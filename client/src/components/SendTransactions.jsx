import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionsSchema } from "@/formSchema"
import { useUsers } from "@/store/userSlice"

const SendTransactions = () => {

    const form = useForm({
        resolver: zodResolver(transactionsSchema),
        defaultValues: {
            name: '',
            amount: 0
        }
    })

    const { createTransaction } = useUsers();

    const onSubmit = (data) => {
        createTransaction(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Add transaction</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add transaction</DialogTitle>
                    <DialogDescription>
                        Make a <span className="underline">new</span> transaction. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                className="col-span-3"
                                                placeholder="Food"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="amount" className="text-right">
                                            Amount
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="amount"
                                                type="number"
                                                className="col-span-3"
                                                placeholder="0"
                                                {...field} 
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" className='mt-4' variant='outline'>Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default SendTransactions