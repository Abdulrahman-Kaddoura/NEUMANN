import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export function useAuth() {
    const auth = useContext(authContext);

    if (auth === undefined) {
        throw new Error('useAuth must be used with a AuthProvider');
    }

    return auth;
}