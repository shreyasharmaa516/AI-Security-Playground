import { useEffect, useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { updateProfile } from '../api';
import './ProfileTab.css';

/**
 * ProfileTab
 * User preferences: name, email, role. Local form state is seeded from the
 * fetched profile and saved back through `updateProfile`.
 */
export default function ProfileTab({ profile }) {
  const [form, setForm] = useState(profile);
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved | error

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const initials = form.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  async function handleSave() {
    setSaveState('saving');
    try {
      await updateProfile(form);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch {
      setSaveState('error');
    }
  }

  return (
    <div className="profile-tab">
      <div className="profile-tab__avatar-row">
        <span className="profile-tab__avatar">{initials}</span>
        <div className="profile-tab__avatar-text">
          <span className="text-body">Profile photo</span>
          <span className="text-body-sm profile-tab__avatar-hint">JPG or PNG, up to 2MB (UI only for now)</span>
        </div>
      </div>

      <div className="profile-tab__field">
        <label className="text-h3-label" htmlFor="profile-name">Name</label>
        <Input id="profile-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>

      <div className="profile-tab__field">
        <label className="text-h3-label" htmlFor="profile-email">Email</label>
        <Input
          id="profile-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="profile-tab__field">
        <label className="text-h3-label" htmlFor="profile-role">Role</label>
        <Input id="profile-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      </div>

      <div className="profile-tab__footer">
        {saveState === 'saved' && <span className="text-body-sm profile-tab__saved">Saved</span>}
        {saveState === 'error' && <span className="text-body-sm profile-tab__error-text">Failed to save</span>}
        <Button variant="primary" loading={saveState === 'saving'} onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
