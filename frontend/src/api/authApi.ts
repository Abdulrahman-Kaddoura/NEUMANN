import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '../types/auth';
import { apiClient } from './client';


export async function login(credentials: LoginRequest): Promise<LoginResponse>{
    const response = apiClient.post("/auth/login", credentials);
    return (await response).data
}

export async function register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = apiClient.post("/auth/register", data);
    return (await response).data;
}

export async function me(): Promise<User> {
    const response = apiClient.get<User>("/auth/me");
    return (await response).data;
}