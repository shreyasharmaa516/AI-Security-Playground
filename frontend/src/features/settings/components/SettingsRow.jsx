import './SettingsRow.css';

/**
 * SettingsRow
 * The label/description/control row pattern repeated across every tab
 * (notifications, security toggles, etc). Kept feature-local since this
 * exact "settings list row" shape is specific to this page's form layout.
 */
export default function SettingsRow({ label, description, control }) {
  return (
    <div className="settings-row">
      <div className="settings-row__text">
        <span className="text-body settings-row__label">{label}</span>
        {description && <span className="text-body-sm settings-row__description">{description}</span>}
      </div>
      <div className="settings-row__control">{control}</div>
    </div>
  );
}
