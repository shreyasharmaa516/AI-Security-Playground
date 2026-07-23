import DashboardPage from '../features/dashboard/DashboardPage';

/**
 * Route-level entry for "/". Kept thin on purpose — all Dashboard logic
 * and composition lives in the feature module.
 */
export default function Dashboard() {
  return <DashboardPage />;
}
