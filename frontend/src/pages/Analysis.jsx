import AnalysisPage from '../features/analysis/AnalysisPage';

/**
 * Route-level entry for "/analysis". Kept thin — all Analysis logic and
 * composition lives in the feature module.
 */
export default function Analysis() {
  return <AnalysisPage />;
}
