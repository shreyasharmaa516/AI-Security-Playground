import { Moon, Sun } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import './AppearanceTab.css';

const THEMES = [
  { id: 'dark', label: 'Dark', description: 'The default Sentra theme.', icon: Moon, available: true },
  { id: 'light', label: 'Light', description: 'A light appearance for daytime use.', icon: Sun, available: false },
];

/**
 * AppearanceTab
 * Theme/appearance settings, UI only — Light is intentionally disabled
 * rather than faking a toggle that does nothing, per the design spec.
 */
export default function AppearanceTab() {
  return (
    <div className="appearance-tab">
      <div className="appearance-tab__options">
        {THEMES.map((theme) => {
          const Icon = theme.icon;
          return (
            <div
              key={theme.id}
              className={`appearance-tab__option ${theme.id === 'dark' ? 'appearance-tab__option--selected' : ''} ${
                !theme.available ? 'appearance-tab__option--disabled' : ''
              }`}
            >
              <div className="appearance-tab__option-icon">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <div className="appearance-tab__option-text">
                <div className="appearance-tab__option-title">
                  <span className="text-body">{theme.label}</span>
                  {!theme.available && <Badge variant="neutral" dot={false}>Coming soon</Badge>}
                  {theme.id === 'dark' && <Badge variant="safe" dot={false}>Active</Badge>}
                </div>
                <span className="text-body-sm">{theme.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
