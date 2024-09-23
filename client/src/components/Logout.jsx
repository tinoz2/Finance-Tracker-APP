import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useUsers } from '@/store/userSlice'
import { logoutRequest } from '@/api/fetchData'
import { toastError, toastSuccess } from '@/utils/toast'

const Logout = () => {

    const navigate = useNavigate()
    const { clearUser } = useUsers()

    const logoutUser = async () => {
        try {
            const res = await logoutRequest()
            if (res.data) {
                clearUser()
                navigate('/')
                toastSuccess({ title: 'Account unlogged successfully' })
            }
        } catch (error) {
            console.error(error)
            toastError({ title: error.response?.data?.message || 'Error in trying to logout' })
        }
    }

    return (
        <Button
            type="submit"
            variant="destructive"
            onClick={logoutUser}>
            Logout
        </Button>
    )
}

export default Logout