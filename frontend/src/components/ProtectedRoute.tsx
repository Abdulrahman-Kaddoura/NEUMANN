import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
    const { user, isLoading } = useAuth();
    return (

    );
}