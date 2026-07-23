import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './CopyButton.css';

/**
 * CopyButton
 * Copies `value` to the clipboard and briefly shows a confirmation icon.
 * Used for the API key in Settings; reusable anywhere else a copyable
 * value appears (record IDs, webhook URLs, etc).
 */
export default function CopyButton({ value, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail silently,
      // the value remains visible/selectable for manual copy.
    }
  }

  return (
    <button type="button" className="copy-button" onClick={handleCopy} aria-label={label}>
      {copied ? <Check size={14} strokeWidth={1.75} /> : <Copy size={14} strokeWidth={1.75} />}
      {copied ? 'Copied' : label}
    </button>
  );
}
