import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useUsers } from "@/store/userSlice"
import { useEffect } from "react"
import icon from '/profile.png'
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

const Navbar = () => {

    const { user, fetchUser } = useUsers()

    useEffect(() => {
        const loadUser = async () => {
            await fetchUser()
        }
        loadUser()
    }, [])

    return (
        <header>
            <nav className="flex items-center justify-around font-semibold text-base p-6">
                <Link to='/'>
                    <h1 className="flex items-center mr-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                    </svg>
                        MyWallet</h1>
                </Link>
                <div className="flex space-x-4">
                    <li><Button asChild variant="link"><Link to='/budget'>Budget</Link></Button></li>
                    <li><Button asChild variant="link"><Link to='/goals'>Goals</Link></Button></li>
                    <li><Button asChild variant="link"><Link to='/history'>History</Link></Button></li>
                    {
                        user ?
                            <li><Button asChild variant="link"><Link to='/profile'><Avatar><AvatarImage src={icon} className="w-10" /> </Avatar></Link></Button></li>
                            :
                            <li><Button asChild variant="link"><Link to='/register'>Register</Link></Button></li>
                    }
                </div>
            </nav>
            <hr className="shadow border rounded-mainRounded" />
        </header>
    )
}

export default Navbar