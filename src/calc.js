/**
 * Parse a string to a non-negative finite float.
 * Returns NaN for empty, null, undefined, negative, or non-numeric input.
 * @param {string|null|undefined} str
 * @returns {number}
 */
export function parseAmount(str) {
  if (str === '' || str === null || str === undefined) return NaN
  const v = Number(str)
  if (!isFinite(v) || v < 0) return NaN
  return v
}

/**
 * Calculate tip, total, and per-person amounts.
 *
 * @param {{ bill: number, tipPct: number, people: number, roundUp: boolean }} params
 * @returns {{ tip: number, total: number, perPerson: number } | { error: 'bill'|'tip'|'people' }}
 */
export function calculate({ bill, tipPct, people, roundUp }) {
  if (!isFinite(bill) || bill <= 0) return { error: 'bill' }
  if (!isFinite(tipPct) || tipPct < 0) return { error: 'tip' }
  if (!Number.isInteger(people) || people < 1 || people > 999) return { error: 'people' }

  const tip = bill * (tipPct / 100)
  let total = bill + tip
  if (roundUp) total = Math.ceil(total)
  const perPerson = total / people

  return { tip, total, perPerson }
}
