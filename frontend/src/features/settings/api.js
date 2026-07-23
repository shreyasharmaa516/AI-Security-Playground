/**
 * Settings API contract.
 *
 * Mirrors the future FastAPI endpoints:
 *   GET /api/v1/settings                    -> Settings
 *   PUT /api/v1/settings/profile             -> ProfileSettings
 *   PUT /api/v1/settings/notifications       -> NotificationSettings
 *   PUT /api/v1/settings/security            -> SecuritySettings
 *   POST /api/v1/settings/security/rotate-key -> { apiKey }
 *   DELETE /api/v1/settings/sessions/:id     -> void
 */

const SIMULATED_LATENCY_MS = 450;

// Placeholder demo data — not a real credential. Replace with a live
// fetch from the backend once the Settings API is wired up.
let SETTINGS = {
  profile: {
    name: 'Aditya Kumar',
    email: 'aditya.kumar@sentra.io',
    role: 'Security Engineer',
  },
  appearance: {
    theme: 'dark', // 'light' is UI-only, disabled ("coming soon")
  },
  notifications: {
    criticalAlerts: true,
    weeklyDigest: true,
    productUpdates: false,
    slackAlerts: false,
  },
  security: {
    apiKey: 'sntr_demo_7f3a9c1e2b8d4f6a0c5e9d2b1a4f8c7e',
    twoFactorEnabled: true,
    sessionTimeout: '30m',
    sessions: [
      { id: 'sess_1', device: 'MacBook Pro \u2014 Chrome', location: 'Singapore, SG', lastActive: 'now', current: true },
      { id: 'sess_2', device: 'iPhone 15 \u2014 Safari', location: 'Singapore, SG', lastActive: '2h ago', current: false },
    ],
  },
};

export async function fetchSettings({ simulateError = false } = {}) {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  if (simulateError) throw new Error('Unable to load settings. Please try again.');
  return SETTINGS;
}

export async function updateProfile(profile) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  SETTINGS = { ...SETTINGS, profile: { ...SETTINGS.profile, ...profile } };
  return SETTINGS.profile;
}

export async function updateNotifications(notifications) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  SETTINGS = { ...SETTINGS, notifications: { ...SETTINGS.notifications, ...notifications } };
  return SETTINGS.notifications;
}

export async function updateSecurity(security) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  SETTINGS = { ...SETTINGS, security: { ...SETTINGS.security, ...security } };
  return SETTINGS.security;
}

export async function rotateApiKey() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const newKey = `sntr_demo_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;
  SETTINGS = { ...SETTINGS, security: { ...SETTINGS.security, apiKey: newKey } };
  return newKey;
}

export async function revokeSession(sessionId) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  SETTINGS = {
    ...SETTINGS,
    security: {
      ...SETTINGS.security,
      sessions: SETTINGS.security.sessions.filter((s) => s.id !== sessionId),
    },
  };
  return SETTINGS.security.sessions;
}

export const SESSION_TIMEOUT_OPTIONS = [
  { value: '15m', label: '15m' },
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
];

export const APP_INFO = {
  version: '2.4.1',
  releaseDate: 'Jul 18, 2026',
  changelogUrl: 'https://sentra.example.com/changelog',
  docsUrl: 'https://sentra.example.com/docs',
  supportEmail: 'support@sentra.io',
};

export const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'about', label: 'About' },
];
