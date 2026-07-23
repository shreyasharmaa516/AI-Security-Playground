/**
 * getCssVar
 * Canvas-based rendering (Chart.js) cannot resolve CSS custom properties
 * the way regular DOM/CSS can — it needs a literal color string. This reads
 * the value straight from :root at call time so charts still derive their
 * colors from tokens.css instead of duplicating hex values in JS.
 */
export function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
