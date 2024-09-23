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
import registerSchema from "@/formSchema.js"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Lock, LockKeyhole, Mail, User } from "lucide-react"
import { registerRequest } from "@/api/fetchData"
import { toastError, toastSuccess } from "@/utils/toast"

const Register = () => {

    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            if (data.password !== confirmPassword) {
                toastError({ title: 'Passwords do not match!' });
                return;
            }

            const res = await registerRequest(data)
            if (res.data) {
                toastSuccess({ title: 'Account created successfully' })
                navigate('/login')
            }
        }
        catch (err) {
            console.error(err)
            toastError({ title: err.response?.data?.message || 'Could not create your account' })
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-16 m-auto w-1/4 flex flex-col justify-center">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold flex items-center"><User size={20} className="mr-1.5" />Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold flex items-center"><Mail size={20} className="mr-1.5" />Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" type="email" {...field} />
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
                <FormItem>
                    <FormLabel className="font-semibold flex items-center"><LockKeyhole size={20} className="mr-1.5" />Confirm password</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                </FormItem>
                <Link className="text-sm hover:underline font-semibold" to='/login'>Already have an account ?</Link>
                <Button type="submit" variant="outline" size="lg" className="w-fit">Submit</Button>
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#C2D9FF" fillOpacity="0.8" d="M0,64L48,53.3C96,43,192,21,288,37.3C384,53,480,107,576,154.7C672,203,768,245,864,234.7C960,224,1056,160,1152,133.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </Form>
    )
}

export default Register