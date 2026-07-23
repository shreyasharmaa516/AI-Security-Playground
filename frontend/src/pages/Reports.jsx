import ReportsPage from '../features/reports/ReportsPage';

/**
 * Route-level entry for "/reports". Kept thin — all Reports logic and
 * composition lives in the feature module.
 */
export default function Reports() {
  return <ReportsPage />;
}
