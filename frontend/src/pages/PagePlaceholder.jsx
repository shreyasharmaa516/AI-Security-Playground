import './PagePlaceholder.css';

/**
 * PagePlaceholder
 * Temporary stand-in for pages not yet implemented. Keeps routing/shell
 * testable without pretending finished UI exists. Remove usages as each
 * real page is built.
 */
export default function PagePlaceholder({ title }) {
  return (
    <div className="page-placeholder">
      <div className="page-placeholder__box">
        <span className="text-h3-label">Not yet built</span>
        <h2 className="text-h2">{title}</h2>
        <p className="text-body-sm">
          This page will be implemented in a later step, per the incremental build plan.
        </p>
      </div>
    </div>
  );
}
