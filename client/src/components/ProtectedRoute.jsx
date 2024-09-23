import { useUsers } from "@/store/userSlice";
import Loading from "@/utils/Loading";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { fetchUser, isAuthenticated, loading } = useUsers();

    useEffect(() => {
        const loadUser = async () => {
            await fetchUser()
        };
        loadUser();
    }, [fetchUser, isAuthenticated, loading]);

    if (loading) return <Loading />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
