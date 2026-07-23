import { User, Palette, Bell, ShieldCheck, Info } from 'lucide-react';
import { SETTINGS_TABS } from '../api';
import './SettingsTabs.css';

const TAB_ICONS = { profile: User, appearance: Palette, notifications: Bell, security: ShieldCheck, about: Info };

/**
 * SettingsTabs
 * Settings-only vertical tab list. Unlike the app's primary sidebar nav,
 * this is scoped to within the page, so it stays a feature component
 * rather than a shared one.
 */
export default function SettingsTabs({ active, onChange }) {
  return (
    <nav className="settings-tabs" aria-label="Settings sections">
      {SETTINGS_TABS.map(({ id, label }) => {
        const Icon = TAB_ICONS[id];
        return (
          <button
            key={id}
            type="button"
            className={`settings-tabs__item ${active === id ? 'settings-tabs__item--active' : ''}`}
            onClick={() => onChange(id)}
          >
            <Icon size={16} strokeWidth={1.75} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
