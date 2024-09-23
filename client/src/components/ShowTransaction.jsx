import { DollarSign } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { useUsers } from "@/store/userSlice"

const ShowTransaction = ({ transaction, i}) => {

    const formattedDate = new Date(transaction.date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const { deleteTransaction } = useUsers();

    const handleDelete = (id) => {
        deleteTransaction(id);
    };

    return (
        <div className="flex items-center justify-between" key={i}>
            <div className='flex items-center'>
                <div className="bg-gray-200 rounded-mainRounded p-4 mr-4">
                    <DollarSign size={30} />
                </div>
                <div className="flex flex-col space-y-1">
                    <p className="text-lg">{transaction.name}</p>
                    <strong className='mr-4 text-base'>-{transaction.amount}$</strong>
                    <span className="text-sm">{formattedDate}</span>
                </div>
            </div>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                transaction and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(transaction._id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default ShowTransaction