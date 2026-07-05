import "./Layout.css";

import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar/TopBar";

export default function Layout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <main className="content">

        <TopBar />

        {children}

      </main>

    </div>
  );
}