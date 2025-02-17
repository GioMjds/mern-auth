/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";
import { User } from "../types/auth";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: { email: string; password: string }) => Promise<void>;
    register: (data: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check if user is authenticated on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await API.get("/auth/protected");
                setUser(response.data.user);
            } catch (error: any) {
                setUser(null);
                console.error(`Authentication failed: ${error}`);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (data: { email: string; password: string }) => {
        try {
            const response = await API.post("/auth/login", data);
            setUser(response.data.user);
            return response.data.token;
        } catch (error: any) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (data: { email: string; password: string }) => {
        try {
            await API.post("/auth/register", data);
        } catch (error: any) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await API.post("/auth/logout");
            setUser(null);
        } catch (error: any) {
            console.error("Logout failed:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);