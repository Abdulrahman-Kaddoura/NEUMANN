import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}