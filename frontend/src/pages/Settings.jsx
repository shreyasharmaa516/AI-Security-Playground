import SettingsPage from '../features/settings/SettingsPage';

/**
 * Route-level entry for "/settings". Kept thin — all Settings logic and
 * composition lives in the feature module.
 */
export default function Settings() {
  return <SettingsPage />;
}
