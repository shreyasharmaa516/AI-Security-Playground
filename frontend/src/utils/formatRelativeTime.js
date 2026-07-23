/**
 * formatRelativeTime
 * Converts an ISO timestamp (or Date) into a short relative string like
 * "2m ago", "3h ago", "5d ago". Falls back to a locale date string once the
 * gap exceeds 7 days, since "23d ago" is less useful than a real date.
 */
export function formatRelativeTime(input) {
  const date = input instanceof Date ? input : new Date(input);
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
