import { ChevronUp, ChevronDown } from 'lucide-react';
import './Table.css';

/**
 * Table
 * Generic column-driven table. `columns` is [{ key, header, align, render, sortKey }].
 * `onRowClick` is optional — when present, rows become clickable (used by
 * pages like History for a detail drawer; Dashboard's Recent Analyses table
 * does not need it).
 * `sortState` ({ sortBy, sortDir }) + `onSort(sortKey)` are optional — when
 * both are provided, any column with a `sortKey` gets a clickable, sortable
 * header with a direction indicator.
 */
export default function Table({ columns, rows, onRowClick, getRowKey, sortState, onSort }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => {
            const isSortable = Boolean(col.sortKey && onSort);
            const isActive = isSortable && sortState?.sortBy === col.sortKey;

            return (
              <th
                key={col.key}
                className={`text-h3-label table__th table__th--${col.align ?? 'left'} ${
                  isSortable ? 'table__th--sortable' : ''
                }`}
                onClick={isSortable ? () => onSort(col.sortKey) : undefined}
              >
                <span className="table__th-inner">
                  {col.header}
                  {isSortable && (
                    <span className="table__sort-icon">
                      {isActive && sortState.sortDir === 'asc' ? (
                        <ChevronUp size={12} strokeWidth={2} />
                      ) : (
                        <ChevronDown size={12} strokeWidth={2} className={isActive ? '' : 'table__sort-icon--dim'} />
                      )}
                    </span>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={getRowKey ? getRowKey(row) : i}
            className={onRowClick ? 'table__row table__row--clickable' : 'table__row'}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map((col) => (
              <td key={col.key} className={`table__td table__td--${col.align ?? 'left'}`}>
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
