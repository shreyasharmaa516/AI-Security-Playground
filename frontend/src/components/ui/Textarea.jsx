import './Textarea.css';

/**
 * Textarea
 * Generic form textarea. `variant="mono"` switches to the monospace font
 * for code/prompt-like content (Analysis prompt editor, future Settings
 * webhook payloads, etc). Plain `variant="default"` for prose fields.
 */
export default function Textarea({ variant = 'default', className = '', ...rest }) {
  return (
    <textarea
      className={`textarea textarea--${variant} ${className}`}
      {...rest}
    />
  );
}
