import HistoryPage from '../features/history/HistoryPage';

/**
 * Route-level entry for "/history". Kept thin — all History logic and
 * composition lives in the feature module.
 */
export default function History() {
  return <HistoryPage />;
}
