import { useState } from 'react';
import { Monitor, ShieldAlert } from 'lucide-react';
import CopyButton from '../../../components/ui/CopyButton';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Switch from '../../../components/ui/Switch';
import SegmentedControl from '../../../components/ui/SegmentedControl';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import EmptyState from '../../../components/ui/EmptyState';
import SettingsRow from './SettingsRow';
import { rotateApiKey, revokeSession, updateSecurity, SESSION_TIMEOUT_OPTIONS } from '../api';
import './SecurityTab.css';

function maskKey(key) {
  return `${key.slice(0, 10)}${'\u2022'.repeat(18)}${key.slice(-4)}`;
}

/**
 * SecurityTab
 * API key rotation (confirmed via the shared Modal), two-factor toggle,
 * session timeout, and an active-sessions list with per-row revoke.
 */
export default function SecurityTab({ security }) {
  const [apiKey, setApiKey] = useState(security.apiKey);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [twoFactor, setTwoFactor] = useState(security.twoFactorEnabled);
  const [sessionTimeout, setSessionTimeout] = useState(security.sessionTimeout);
  const [sessions, setSessions] = useState(security.sessions);

  async function handleRotate() {
    setRotating(true);
    try {
      const newKey = await rotateApiKey();
      setApiKey(newKey);
      setConfirmOpen(false);
    } finally {
      setRotating(false);
    }
  }

  async function handleTwoFactorChange(next) {
    setTwoFactor(next);
    await updateSecurity({ twoFactorEnabled: next });
  }

  async function handleTimeoutChange(next) {
    setSessionTimeout(next);
    await updateSecurity({ sessionTimeout: next });
  }

  async function handleRevoke(session) {
    setSessions((prev) => prev.filter((s) => s.id !== session.id));
    await revokeSession(session.id);
  }

  const sessionColumns = [
    {
      key: 'device',
      header: 'Device',
      render: (row) => (
        <div className="security-tab__device-cell">
          <Monitor size={14} strokeWidth={1.75} className="security-tab__device-icon" />
          <span>{row.device}</span>
          {row.current && <Badge variant="safe" dot={false}>This device</Badge>}
        </div>
      ),
    },
    { key: 'location', header: 'Location', render: (row) => <span className="text-body-sm">{row.location}</span> },
    { key: 'lastActive', header: 'Last Active', align: 'right', render: (row) => <span className="text-body-sm">{row.lastActive}</span> },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (row) =>
        !row.current && (
          <button type="button" className="security-tab__revoke" onClick={() => handleRevoke(row)}>
            Revoke
          </button>
        ),
    },
  ];

  return (
    <div className="security-tab">
      <section className="security-tab__section">
        <span className="text-h3-label">API Key</span>
        <div className="security-tab__key-row">
          <code className="text-mono security-tab__key">{maskKey(apiKey)}</code>
          <CopyButton value={apiKey} label="Copy" />
          <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
            Regenerate
          </Button>
        </div>
        <p className="text-body-sm security-tab__hint">
          This key authenticates requests to the Sentra API. Regenerating it immediately invalidates the previous
          key.
        </p>
      </section>

      <section className="security-tab__section">
        <SettingsRow
          label="Two-Factor Authentication"
          description="Require a verification code in addition to your password."
          control={<Switch checked={twoFactor} onChange={handleTwoFactorChange} label="Two-Factor Authentication" />}
        />
        <SettingsRow
          label="Session Timeout"
          description="Automatically sign out after a period of inactivity."
          control={
            <SegmentedControl options={SESSION_TIMEOUT_OPTIONS} value={sessionTimeout} onChange={handleTimeoutChange} />
          }
        />
      </section>

      <section className="security-tab__section">
        <span className="text-h3-label">Active Sessions</span>
        {sessions.length === 0 ? (
          <EmptyState icon={ShieldAlert} title="No active sessions" description="You're only signed in on this device." />
        ) : (
          <div className="security-tab__sessions-table">
            <Table columns={sessionColumns} rows={sessions} getRowKey={(row) => row.id} />
          </div>
        )}
      </section>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Regenerate API Key"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)} disabled={rotating}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleRotate} loading={rotating}>
              Regenerate Key
            </Button>
          </>
        }
      >
        <p className="text-body-sm">
          Any application using your current API key will stop working immediately. This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
