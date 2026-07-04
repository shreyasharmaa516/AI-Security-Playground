import "./Layout.css";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        {children}
      </div>
    </div>
  );
}