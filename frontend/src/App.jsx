import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Analysis from "./pages/Analysis/Analysis";
import History from "./pages/History/History";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/analysis" element={<Analysis />} />

          <Route path="/history" element={<History />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}