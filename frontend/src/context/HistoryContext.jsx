import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAnalysisHistory } from "../services/api";

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  async function refreshHistory() {
    try {
      const data = await getAnalysisHistory();
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshHistory();
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history,
        loading,
        refreshHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}