import './EmptyState.css';

/**
 * EmptyState
 * Used whenever a card/table/chart has no data yet. Never fake placeholder
 * data — show this instead, with an optional action to unblock the user.
 */
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={22} strokeWidth={1.5} className="empty-state__icon" />}
      <h3 className="text-h2 empty-state__title">{title}</h3>
      {description && <p className="text-body-sm empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
