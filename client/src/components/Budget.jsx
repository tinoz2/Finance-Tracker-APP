import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CalendarDays, Check } from 'lucide-react'
import { monthlyBudgetSchema, yearlyBudgetSchema } from "@/formSchema"
import { toastError, toastSuccess } from "@/utils/toast"
import { createMonth, createYear } from "@/api/fetchTransactions"

const Budget = () => {

    const formMonth = useForm({
        resolver: zodResolver(monthlyBudgetSchema),
        defaultValues: {
            softmonth: false,
            hardmonth: false,
            budgetmonth: 0,
        },
    })

    const formYear = useForm({
        resolver: zodResolver(yearlyBudgetSchema),
        defaultValues: {
            softyear: false,
            hardyear: false,
            budgetyear: 0,
        },
    })

    const onSubmitMonth = async (data) => {
        try {
            if (data.softmonth && data.hardmonth) {
                return toastError({ title: "You only can choose 1 option" });
            }
            if (!data.softmonth && !data.hardmonth) {
                return toastError({ title: "You must choose 1 option" });
            }

            await createMonth(data);
            toastSuccess({ title: "Monthly budget created successfully" });
        } catch (error) {
            console.log(error);
            toastError({ title: "Error creating monthly budget" });
        }
    };

    const onSubmitYear = async (data) => {
        try {
            if (data.softyear && data.hardyear) {
                return toastError({ title: "You only can choose 1 option" });
            }
            if (!data.softyear && !data.hardyear) {
                return toastError({ title: "You must choose 1 option" });
            }

            await createYear(data);
            toastSuccess({ title: "Yearly budget created successfully" });
        } catch (error) {
            console.log(error);
            toastError({ title: "Error creating yearly budget" });
        }
    };

    return (
        <section className="mt-8 space-y-10 w-1/2 m-auto flex flex-col justify-center items-center">
            <div>
                <Form {...formMonth}>
                    <form onSubmit={formMonth.handleSubmit(onSubmitMonth)} className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center">Set up your <span className="text-third underline mx-1.5">monthly</span> budget <CalendarDays className="ml-2" size={30} /></h3>
                            <div>
                                <p className="font-semibold mb-2">What's your budget for the month?</p>
                                <FormField
                                    control={formMonth.control}
                                    name="budgetmonth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder='$0'
                                                    className='w-[70rem] 
                                                rounded-lg'
                                                    {...field}
                                                    type='number'
                                                    onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <p className="font-semibold">What's your budget for the month?</p>
                        <FormField
                            control={formMonth.control}
                            name="softmonth"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Soft
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formMonth.control}
                            name="hardmonth"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Hard
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="check">Save <Check className="size-4 ml-2" /> </Button>
                    </form>
                </Form>
            </div>
            <div>
                <Form {...formYear}>
                    <form onSubmit={formYear.handleSubmit(onSubmitYear)} className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 flex items-center">Set up your <span className="text-third underline mx-1.5">yearly</span> budget <CalendarDays className="ml-2" size={30} /></h3>
                            <div>
                                <p className="font-semibold mb-2">What's your budget for the year?</p>
                                <FormField
                                    control={formYear.control}
                                    name="budgetyear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder='$0' className='w-[70rem]
                                                    rounded-lg'
                                                    type='number'
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <p className="font-semibold">What's your budget for the year?</p>
                        <FormField
                            control={formYear.control}
                            name="softyear"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Soft
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formYear.control}
                            name="hardyear"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Hard
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="check">Save <Check className="size-4 ml-2" /> </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}

export default Budget