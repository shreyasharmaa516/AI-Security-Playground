import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

/**
 * Pagination
 * Minimal "1–20 of 342" control with prev/next chevrons. No numbered page
 * buttons by design (per spec — unnecessary complexity for dense tables).
 * Reusable anywhere a table/list is paginated (History now, Reports later).
 */
export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <div className="pagination">
      <span className="text-body-sm pagination__range">
        {start}–{end} of {total}
      </span>
      <div className="pagination__controls">
        <button
          type="button"
          className="pagination__btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="pagination__btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={15} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
