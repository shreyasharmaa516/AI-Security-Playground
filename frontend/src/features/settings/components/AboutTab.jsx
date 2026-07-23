import { ExternalLink } from 'lucide-react';
import { APP_INFO } from '../api';
import './AboutTab.css';

/**
 * AboutTab
 * Application information: version, changelog, docs, support. Plain text
 * rows, no marketing fluff, per the design spec.
 */
export default function AboutTab() {
  return (
    <div className="about-tab">
      <div className="about-tab__row">
        <span className="text-h3-label">Version</span>
        <span className="text-mono">{APP_INFO.version}</span>
      </div>
      <div className="about-tab__row">
        <span className="text-h3-label">Released</span>
        <span className="text-body-sm">{APP_INFO.releaseDate}</span>
      </div>
      <div className="about-tab__row">
        <span className="text-h3-label">Changelog</span>
        <a href={APP_INFO.changelogUrl} className="about-tab__link" target="_blank" rel="noreferrer">
          View changelog <ExternalLink size={12} strokeWidth={1.75} />
        </a>
      </div>
      <div className="about-tab__row">
        <span className="text-h3-label">Documentation</span>
        <a href={APP_INFO.docsUrl} className="about-tab__link" target="_blank" rel="noreferrer">
          docs.sentra.io <ExternalLink size={12} strokeWidth={1.75} />
        </a>
      </div>
      <div className="about-tab__row">
        <span className="text-h3-label">Support</span>
        <a href={`mailto:${APP_INFO.supportEmail}`} className="about-tab__link">
          {APP_INFO.supportEmail}
        </a>
      </div>
    </div>
  );
}
