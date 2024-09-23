import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/formSchema.js"
import { Link, useNavigate } from "react-router-dom"
import { Lock, Mail } from "lucide-react"
import { loginRequest } from "@/api/fetchData"
import { toastError, toastSuccess } from "@/utils/toast"
import { useUsers } from "@/store/userSlice"

const Login = () => {

    const navigate = useNavigate()
    const { fetchUser } = useUsers()

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data) => {
        try {
            const res = await loginRequest(data)
            if (res) {
                toastSuccess({ title: 'Logged successfully' })
                await fetchUser()
                return navigate('/')
            }
        }
        catch (err) {
            console.error(err)
            toastError({ title: err.response?.data?.message || 'Could not log in' })
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-16 m-auto w-1/4 flex flex-col justify-center">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold flex items-center"><Mail size={20} className="mr-1.5" />Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold flex items-center"><Lock size={20} className="mr-1.5" />Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link className="text-sm hover:underline font-semibold" to='/register'>Don't you have an account ?</Link>
                <Button type="submit" variant="outline" size="lg" className="w-fit">Submit</Button>
            </form>
            <div className="mt-28">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#C8A1E0" fillOpacity="0.8" d="M0,64L48,53.3C96,43,192,21,288,37.3C384,53,480,107,576,154.7C672,203,768,245,864,234.7C960,224,1056,160,1152,133.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
        </Form>
    )
}

export default Login