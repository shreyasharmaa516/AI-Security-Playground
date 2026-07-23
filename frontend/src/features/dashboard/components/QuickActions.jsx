import { useNavigate } from 'react-router-dom';
import { ScanSearch, FileText, KeyRound, Download } from 'lucide-react';
import Button from '../../../components/ui/Button';
import './QuickActions.css';

const ACTIONS = [
  { label: 'Run New Analysis', icon: ScanSearch, to: '/analysis' },
  { label: 'View Reports', icon: FileText, to: '/reports' },
  { label: 'Configure API', icon: KeyRound, to: '/settings' },
  { label: 'Export Data', icon: Download, to: '/history' },
];

/**
 * QuickActions
 * Secondary-style buttons so they don't visually compete with the data
 * above. Routes to the relevant page for each action.
 */
export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">
      {ACTIONS.map((action) => (
        <Button
          key={action.label}
          variant="secondary"
          icon={action.icon}
          className="quick-actions__btn"
          onClick={() => navigate(action.to)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
