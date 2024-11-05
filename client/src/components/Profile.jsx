import { useUsers } from '@/store/userSlice';
import Logout from './Logout';
import RecentTransactions from './RecentTransactions';
import SendTransactions from './SendTransactions';
import img from '/home.jpg';
import { useEffect } from 'react';

const Profile = () => {

    const { user, fetchUser } = useUsers()

    useEffect(() => {
        const loadUser = async() => {
            await fetchUser
        }
        loadUser()
    }, [user, fetchUser])

    return (
        <section className='mt-8 m-auto w-1/2'>
            <div className="relative h-96 rounded-mainRounded overflow-hidden">
                <img
                    src={img}
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                    alt="Background"
                />

                <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                    <h1 className="text-white text-4xl font-bold">Hello, {user.username}! 👋</h1>
                    <p className="text-white mt-2 text-base">
                        We hope you are saving your money up!
                    </p>

                    <div className="mt-4 flex gap-4">
                        <SendTransactions />
                    </div>
                </div>
            </div>
            <div>
                <h3 className='text-xl font-bold my-6'>Recent transactions</h3>
                <div>
                    <RecentTransactions />
                </div>
                <div className='mt-8'>
                    <Logout />
                </div>
            </div>
        </section>
    );
};

export default Profile;