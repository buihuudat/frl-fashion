"use client";

import { apiClient } from "@/services";
import { RegisterType } from "@/types/authType";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  _id: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  phone: string;
  username: string;
  password: string;
  avatar: string;
  verifyEmail: boolean;
  verifyPhone: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  addressText: string;
  __v: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<any>;
  register: (props: RegisterType) => Promise<any>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra localStorage để khôi phục session
    const savedUser = localStorage.getItem("USER_DATA");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (payload: { username: string; password: string }) => {
    const data = await apiClient.post("/auth/login", payload);
    localStorage.setItem("USER_TOKEN", JSON.stringify(data?.data?.token));
    localStorage.setItem("USER_DATA", JSON.stringify(data?.data?.user));
    setUser(data?.data?.user);
    return data;
  };

  const register = async (payload: RegisterType) => {
    const data = await apiClient.post("/auth/register", payload);
    localStorage.setItem("USER_TOKEN", JSON.stringify(data?.data?.token));
    localStorage.setItem("USER_DATA", JSON.stringify(data?.data?.user));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("USER_TOKEN");
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("USER_DATA", JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
