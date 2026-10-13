import { describe, it, expect } from 'vitest'
import { parseAmount, calculate } from '../src/calc.js'

describe('parseAmount', () => {
  it('parses valid positive numbers', () => {
    expect(parseAmount('42')).toBe(42)
    expect(parseAmount('9.99')).toBe(9.99)
    expect(parseAmount('0')).toBe(0)
    expect(parseAmount('100.50')).toBe(100.50)
  })

  it('returns NaN for empty string', () => {
    expect(parseAmount('')).toBeNaN()
  })

  it('returns NaN for non-numeric strings', () => {
    expect(parseAmount('abc')).toBeNaN()
    expect(parseAmount('12abc')).toBeNaN()
    expect(parseAmount('$10')).toBeNaN()
  })

  it('returns NaN for negative numbers', () => {
    expect(parseAmount('-5')).toBeNaN()
    expect(parseAmount('-0.01')).toBeNaN()
  })

  it('returns NaN for null and undefined', () => {
    expect(parseAmount(null)).toBeNaN()
    expect(parseAmount(undefined)).toBeNaN()
  })

  it('returns NaN for Infinity', () => {
    expect(parseAmount('Infinity')).toBeNaN()
  })
})

describe('calculate', () => {
  describe('basic tip calculation', () => {
    it('calculates 15% tip on a round bill', () => {
      const r = calculate({ bill: 100, tipPct: 15, people: 1, roundUp: false })
      expect(r).toEqual({ tip: 15, total: 115, perPerson: 115 })
    })

    it('calculates 20% tip', () => {
      const r = calculate({ bill: 50, tipPct: 20, people: 1, roundUp: false })
      expect(r).toEqual({ tip: 10, total: 60, perPerson: 60 })
    })

    it('calculates 10% tip', () => {
      const r = calculate({ bill: 80, tipPct: 10, people: 1, roundUp: false })
      expect(r).toEqual({ tip: 8, total: 88, perPerson: 88 })
    })

    it('calculates 0% tip', () => {
      const r = calculate({ bill: 80, tipPct: 0, people: 1, roundUp: false })
      expect(r).toEqual({ tip: 0, total: 80, perPerson: 80 })
    })
  })

  describe('per-person split', () => {
    it('splits evenly between 2 people', () => {
      const r = calculate({ bill: 100, tipPct: 10, people: 2, roundUp: false })
      expect(r).toEqual({ tip: 10, total: 110, perPerson: 55 })
    })

    it('splits between 4 people', () => {
      const r = calculate({ bill: 100, tipPct: 15, people: 4, roundUp: false })
      expect(r).toEqual({ tip: 15, total: 115, perPerson: 28.75 })
    })

    it('per-person equals total for 1 person', () => {
      const r = calculate({ bill: 75, tipPct: 18, people: 1, roundUp: false })
      expect(r.error).toBeUndefined()
      expect(r.perPerson).toBe(r.total)
    })

    it('handles non-integer division correctly', () => {
      const r = calculate({ bill: 100, tipPct: 15, people: 3, roundUp: false })
      expect(r.error).toBeUndefined()
      expect(r.perPerson).toBeCloseTo(38.333, 3)
    })
  })

  describe('round-up', () => {
    it('rounds total up to nearest whole unit', () => {
      // 97 * 1.15 = 111.55 → rounds to 112
      const r = calculate({ bill: 97, tipPct: 15, people: 1, roundUp: true })
      expect(r.total).toBe(112)
    })

    it('does not change an already-whole total', () => {
      const r = calculate({ bill: 100, tipPct: 10, people: 1, roundUp: true })
      expect(r.total).toBe(110)
    })

    it('does not round when roundUp is false', () => {
      const r = calculate({ bill: 97, tipPct: 15, people: 1, roundUp: false })
      expect(r.total).toBeCloseTo(111.55, 2)
    })

    it('divides rounded total per person', () => {
      const r = calculate({ bill: 97, tipPct: 15, people: 3, roundUp: true })
      expect(r.total).toBe(112)
      expect(r.perPerson).toBeCloseTo(112 / 3, 5)
    })
  })

  describe('invalid input', () => {
    it('returns error for zero bill', () => {
      expect(calculate({ bill: 0, tipPct: 15, people: 1, roundUp: false })).toEqual({ error: 'bill' })
    })

    it('returns error for negative bill', () => {
      expect(calculate({ bill: -10, tipPct: 15, people: 1, roundUp: false })).toEqual({ error: 'bill' })
    })

    it('returns error for NaN bill', () => {
      expect(calculate({ bill: NaN, tipPct: 15, people: 1, roundUp: false })).toEqual({ error: 'bill' })
    })

    it('returns error for Infinity bill', () => {
      expect(calculate({ bill: Infinity, tipPct: 15, people: 1, roundUp: false })).toEqual({ error: 'bill' })
    })

    it('returns error for negative tip percentage', () => {
      expect(calculate({ bill: 100, tipPct: -5, people: 1, roundUp: false })).toEqual({ error: 'tip' })
    })

    it('returns error for NaN tip', () => {
      expect(calculate({ bill: 100, tipPct: NaN, people: 1, roundUp: false })).toEqual({ error: 'tip' })
    })

    it('returns error for zero people', () => {
      expect(calculate({ bill: 100, tipPct: 15, people: 0, roundUp: false })).toEqual({ error: 'people' })
    })

    it('returns error for fractional people', () => {
      expect(calculate({ bill: 100, tipPct: 15, people: 1.5, roundUp: false })).toEqual({ error: 'people' })
    })

    it('returns error for NaN people', () => {
      expect(calculate({ bill: 100, tipPct: 15, people: NaN, roundUp: false })).toEqual({ error: 'people' })
    })

    it('returns error for negative people', () => {
      expect(calculate({ bill: 100, tipPct: 15, people: -1, roundUp: false })).toEqual({ error: 'people' })
    })
  })
})
