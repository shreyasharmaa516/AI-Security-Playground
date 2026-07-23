import { AlertTriangle, AlertOctagon, Info, ShieldCheck } from 'lucide-react';
import { securityInsights } from '../mockData';
import './SecurityInsightsList.css';

const SEVERITY_CONFIG = {
  critical: { icon: AlertOctagon, className: 'security-insight--critical' },
  warning: { icon: AlertTriangle, className: 'security-insight--warning' },
  info: { icon: Info, className: 'security-insight--info' },
  safe: { icon: ShieldCheck, className: 'security-insight--safe' },
};

/**
 * SecurityInsightsList
 * Auto-generated observations styled like a SIEM alert feed: flat rows with
 * a left accent border in the signal color, not a chat-bubble shape.
 */
export default function SecurityInsightsList() {
  return (
    <ul className="security-insights">
      {securityInsights.map((insight) => {
        const config = SEVERITY_CONFIG[insight.severity] ?? SEVERITY_CONFIG.info;
        const Icon = config.icon;
        return (
          <li key={insight.id} className={`security-insight ${config.className}`}>
            <Icon size={15} strokeWidth={1.75} className="security-insight__icon" />
            <div className="security-insight__body">
              <p className="text-body-sm security-insight__text">{insight.text}</p>
              <span className="text-caption">{insight.time}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
