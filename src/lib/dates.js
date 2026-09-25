const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseYM(value) {
  const [y, m] = value.split('-').map(Number);
  return { y, m: m - 1 };
}

function nowYM() {
  const d = new Date();
  return { y: d.getFullYear(), m: d.getMonth() };
}

// "2025-03" → "Mar 2025"
export function formatYM(value) {
  const { y, m } = parseYM(value);
  return `${MONTHS[m]} ${y}`;
}

// Inclusive month count, LinkedIn-style: Mar → Apr is 2 months.
export function monthsBetween(start, end) {
  const a = parseYM(start);
  const b = end ? parseYM(end) : nowYM();
  return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1);
}

// 19 → "1 yr 7 mos"
export function formatDuration(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`]
    .filter(Boolean)
    .join(' ');
}

// Elapsed experience rounded down to the nearest half year: "1.5", "2", "2.5".
export function experienceYears(start) {
  const elapsed = monthsBetween(start) - 1;
  return String(Math.max(1, Math.floor(elapsed / 6)) / 2);
}

export { MONTHS };
