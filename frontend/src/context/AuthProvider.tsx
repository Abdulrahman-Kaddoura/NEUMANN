import { useState, useEffect } from "react";
import type { User } from "../types/auth";
import { authContext } from "./AuthContext";
import { login as loginApi, me as meApi, register as registerApi } from "../api/authApi";
import type { RegisterRequest } from "../types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleUnauthorized = () => {
            setToken(null);
            setUser(null);
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);

        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const savedToken = localStorage.getItem('token');
            try {
                if (savedToken) {
                    setToken(savedToken);

                    const user = await meApi();
                    setUser(user);
                }
            } catch {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await loginApi({ email, password });
        setToken(response.accessToken);
        localStorage.setItem('token', response.accessToken);
        setUser(await meApi());
    };

    const register = async (data: RegisterRequest) => {
        const response = await registerApi(data);
        setToken(response.accessToken);
        localStorage.setItem('token', response.accessToken);
        setUser(await meApi());
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
            register,
            logout
        }}>
            {children}
        </authContext.Provider>
    )
}