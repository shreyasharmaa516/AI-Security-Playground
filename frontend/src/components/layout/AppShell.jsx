import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './AppShell.css';

/**
 * AppShell
 * The persistent application frame: sidebar + top bar + routed page content.
 * Owns sidebar collapse state since it affects the content grid's offset.
 */
export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />

      <div className={`app-shell__main ${collapsed ? 'app-shell__main--collapsed' : ''}`}>
        <TopBar pathname={location.pathname} />
        <main className="app-shell__content">
          <div className="app-shell__content-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
