import { useCallback, useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import ErrorBanner from '../../components/ui/ErrorBanner';
import SettingsTabs from './components/SettingsTabs';
import ProfileTab from './components/ProfileTab';
import AppearanceTab from './components/AppearanceTab';
import NotificationsTab from './components/NotificationsTab';
import SecurityTab from './components/SecurityTab';
import AboutTab from './components/AboutTab';
import { fetchSettings } from './api';
import './SettingsPage.css';

const TAB_META = {
  profile: { title: 'Profile', description: 'Manage your account details.' },
  appearance: { title: 'Appearance', description: 'Choose how Sentra looks.' },
  notifications: { title: 'Notifications', description: 'Control what you get notified about.' },
  security: { title: 'Security', description: 'API access, authentication, and active sessions.' },
  about: { title: 'About Sentra', description: 'Version and support information.' },
};

/**
 * SettingsPage
 * Fetches all settings once on mount, then hands each section down to its
 * own tab component. Tab switching is purely local UI state — no refetch
 * needed since everything was loaded up front.
 */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [phase, setPhase] = useState('loading'); // loading | success | error
  const [settings, setSettings] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const load = useCallback(() => {
    setPhase('loading');
    setErrorMessage(null);
    fetchSettings()
      .then((data) => {
        setSettings(data);
        setPhase('success');
      })
      .catch((err) => {
        setErrorMessage(err.message || 'Failed to load settings.');
        setPhase('error');
      });
  }, []);

  useEffect(load, [load]);

  const meta = TAB_META[activeTab];

  return (
    <div className="settings-page">
      <div className="settings-page__body">
        <SettingsTabs active={activeTab} onChange={setActiveTab} />

        <div className="settings-page__panel">
          {phase === 'error' && <ErrorBanner message={errorMessage} onRetry={load} />}

          {phase === 'loading' && (
            <Card>
              <div className="settings-page__skeleton">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="settings-page__skeleton-row" />
                ))}
              </div>
            </Card>
          )}

          {phase === 'success' && settings && (
            <Card eyebrow="Settings" title={meta.title}>
              <p className="text-body-sm settings-page__panel-description">{meta.description}</p>
              {activeTab === 'profile' && <ProfileTab profile={settings.profile} />}
              {activeTab === 'appearance' && <AppearanceTab />}
              {activeTab === 'notifications' && <NotificationsTab notifications={settings.notifications} />}
              {activeTab === 'security' && <SecurityTab security={settings.security} />}
              {activeTab === 'about' && <AboutTab />}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
