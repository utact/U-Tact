"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // restore admin status from localStorage on initial load
    const adminStatus = localStorage.getItem("utact-admin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = () => {
    setIsAdmin(true);
    localStorage.setItem("utact-admin", "true");
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("utact-admin");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
