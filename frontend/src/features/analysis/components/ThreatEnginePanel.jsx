import Card from '../../../components/ui/Card';
import DetectionEnginePanel from '../../../components/ui/DetectionEnginePanel';
import { DETECTION_CATEGORIES } from '../api';
import './ThreatEnginePanel.css';

/**
 * ThreatEnginePanel
 * Analysis-only wrapper that gives the shared DetectionEnginePanel its
 * card chrome and title on this page. Statuses/details are owned by
 * AnalysisPage and just passed through.
 */
export default function ThreatEnginePanel({ statuses, details }) {
  return (
    <Card eyebrow="Live Scan" title="Threat Detection Engine" className="threat-engine-panel">
      <DetectionEnginePanel categories={DETECTION_CATEGORIES} statuses={statuses} details={details} />
    </Card>
  );
}
