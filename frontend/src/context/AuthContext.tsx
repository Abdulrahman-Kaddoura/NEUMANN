import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextValue, User } from "../types/auth";
import { login: loginApi, me: meApi } from "../api/authApi";

export const authContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
    const auth = useContext(authContext);

    if (auth === undefined) {
        throw new Error('useAuth must be used with a AuthProvider');
    }

    return auth;
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const savedToken = localStorage.getItem('token');

            if (savedToken) {
                setToken(savedToken);

                const user = await meApi(savedToken);
                setUser(user);
            }

            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await loginApi({ email, password });
        setToken(response.accessToken);
        localStorage.setItem('token', response.accessToken);
        setUser(await meApi(response.accessToken));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <authContext.Provider value={{
            token,
            user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </authContext.Provider>
    )
}