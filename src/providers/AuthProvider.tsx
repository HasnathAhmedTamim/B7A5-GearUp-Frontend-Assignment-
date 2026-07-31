"use client";

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import axios from "axios";

import { getCurrentUser, logoutUser } from "@/services/auth/auth.api";
import { User } from "@/types/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getCurrentUser();

            setUser(res.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    // Guest user
                    setUser(null);
                } else {
                    console.error(error);
                }
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
        }
    }, []);

    const value = useMemo(
        () => ({
            user,
            loading,
            isAuthenticated: !!user,
            refreshUser,
            logout,
        }),
        [user, loading, refreshUser, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }

    return context;
}