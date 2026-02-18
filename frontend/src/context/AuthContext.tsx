"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

interface AuthContextType {
    userId: string | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [ userId, setUserId ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/me");
            setUserId(res.data.id);
        } catch {
            setUserId(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        await fetchUser();
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUserId(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

     return (
    <AuthContext.Provider
      value={{ userId, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside AuthProvider");
  return context;
}