// FILE: src/context/SidebarContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    // UPDATED: Add the console.log here
    console.log("Toggling sidebar state...");
    setIsSidebarOpen(prevState => {
      console.log(`Sidebar changing from ${prevState ? 'open' : 'closed'} to ${!prevState ? 'open' : 'closed'}`);
      return !prevState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    return { isSidebarOpen: false, toggleSidebar: () => {} };
  }
  return context;
}