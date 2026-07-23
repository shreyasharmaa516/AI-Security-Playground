import { AlertCircle } from 'lucide-react';
import './ErrorBanner.css';

/**
 * ErrorBanner
 * Inline banner for recoverable errors (failed scan, failed export, etc).
 * Never a full-page takeover — those are reserved for the whole app failing
 * to load. Reusable across any page that calls an API.
 */
export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <AlertCircle size={16} strokeWidth={1.75} className="error-banner__icon" />
      <span className="text-body-sm error-banner__message">{message}</span>
      {onRetry && (
        <button type="button" className="error-banner__retry" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
