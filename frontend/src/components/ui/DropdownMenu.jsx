import { useEffect, useRef, useState } from 'react';
import './DropdownMenu.css';

/**
 * DropdownMenu
 * Generic popover pattern: a trigger (render prop) and a panel of children
 * shown below it, closing on outside click or Escape. Used for History's
 * filter dropdowns and row kebab menus; reusable anywhere else a small
 * contextual menu is needed (Reports filters, Settings actions, etc).
 */
export default function DropdownMenu({ trigger, children, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="dropdown-menu" ref={rootRef}>
      {trigger(() => setOpen((o) => !o), open)}
      {open && (
        <div className={`dropdown-menu__panel dropdown-menu__panel--${align}`}>
          {typeof children === 'function' ? children(() => setOpen(false)) : children}
        </div>
      )}
    </div>
  );
}
