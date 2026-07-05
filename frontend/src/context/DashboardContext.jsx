import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getDashboardStats } from "../services/api";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    highRisk: 0,
    critical: 0,
    safe: 0,
  });

  const [loading, setLoading] = useState(true);

  async function refreshDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        loading,
        refreshDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}