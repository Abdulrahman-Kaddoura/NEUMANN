export type User = {
    id: number;
    email: string;
    role: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
    tokenType: "bearer";
}

export type AuthContextValue = {
    token: string | null;
    user: User | null;
    login: (email: string, password: string) => Promise<void> ;
    logout: () => void;
    isLoading: boolean;
}