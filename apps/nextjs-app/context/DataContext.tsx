"use client";

import { createContext, useContext, ReactNode } from "react";
import { useData } from "../hooks/useData";

// Create a context
const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const data = useData();
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// Ensure this function is correctly exported
export const useGlobalData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useGlobalData must be used within a DataProvider");
  }
  return context;
};
