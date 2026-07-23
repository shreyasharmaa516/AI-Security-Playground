import { useState } from 'react';
import Switch from '../../../components/ui/Switch';
import SettingsRow from './SettingsRow';
import { updateNotifications } from '../api';

const NOTIFICATION_FIELDS = [
  {
    key: 'criticalAlerts',
    label: 'Critical Threat Alerts',
    description: 'Email me immediately when a critical-risk prompt is detected.',
  },
  {
    key: 'weeklyDigest',
    label: 'Weekly Security Digest',
    description: 'A weekly summary of detections and trends, every Monday.',
  },
  {
    key: 'slackAlerts',
    label: 'Slack Alerts',
    description: 'Send critical alerts to the connected Slack workspace.',
  },
  {
    key: 'productUpdates',
    label: 'Product Updates',
    description: 'Occasional emails about new Sentra features and changes.',
  },
];

/**
 * NotificationsTab
 * Each toggle saves independently on change (optimistic UI, matching how a
 * settings panel like this typically behaves) rather than requiring a
 * separate "Save" step.
 */
export default function NotificationsTab({ notifications }) {
  const [values, setValues] = useState(notifications);
  const [savingKey, setSavingKey] = useState(null);

  async function handleToggle(key, next) {
    setValues((prev) => ({ ...prev, [key]: next }));
    setSavingKey(key);
    try {
      await updateNotifications({ [key]: next });
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <div className="notifications-tab">
      {NOTIFICATION_FIELDS.map((field) => (
        <SettingsRow
          key={field.key}
          label={field.label}
          description={field.description}
          control={
            <Switch
              checked={values[field.key]}
              onChange={(next) => handleToggle(field.key, next)}
              disabled={savingKey === field.key}
              label={field.label}
            />
          }
        />
      ))}
    </div>
  );
}
