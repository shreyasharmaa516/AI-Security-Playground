import './Card.css';

/**
 * Card
 * The base surface container used across the app: KPI tiles, chart panels,
 * tables, lists. Optional header slot (title + right-aligned action) keeps
 * every panel's header consistent instead of each page inventing its own.
 */
export default function Card({
  title,
  eyebrow,
  action,
  padded = true,
  className = '',
  children,
  ...rest
}) {
  return (
    <section className={`card ${className}`} {...rest}>
      {(title || action) && (
        <header className="card__header">
          <div className="card__header-titles">
            {eyebrow && <span className="text-h3-label">{eyebrow}</span>}
            {title && <h2 className="text-h2">{title}</h2>}
          </div>
          {action && <div className="card__header-action">{action}</div>}
        </header>
      )}
      <div className={padded ? 'card__body' : 'card__body card__body--flush'}>{children}</div>
    </section>
  );
}
