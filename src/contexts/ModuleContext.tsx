'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ActiveTask {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface ModuleContextType {
  // Active tasks state (preserved across navigation)
  activeTasks: ActiveTask[];
  addTask: (task: Omit<ActiveTask, 'startedAt'>) => void;
  updateTask: (id: string, updates: Partial<ActiveTask>) => void;
  removeTask: (id: string) => void;
  
  // Sidebar state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Active module tracking
  activeModule: string | null;
  setActiveModule: (module: string) => void;
  
  // Telemetric error state
  lastError: { message: string; timestamp: Date } | null;
  setError: (message: string) => void;
  clearError: () => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const [activeTasks, setActiveTasks] = useState<ActiveTask[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [lastError, setLastError] = useState<{ message: string; timestamp: Date } | null>(null);

  const addTask = useCallback((task: Omit<ActiveTask, 'startedAt'>) => {
    setActiveTasks((prev) => [...prev, { ...task, startedAt: new Date() }]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<ActiveTask>) => {
    setActiveTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setActiveTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const setError = useCallback((message: string) => {
    setLastError({ message, timestamp: new Date() });
  }, []);

  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  const value: ModuleContextType = {
    activeTasks,
    addTask,
    updateTask,
    removeTask,
    sidebarOpen,
    toggleSidebar,
    activeModule,
    setActiveModule,
    lastError,
    setError,
    clearError,
  };

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  );
}

export function useModule() {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModule must be used within ModuleProvider');
  }
  return context;
}
