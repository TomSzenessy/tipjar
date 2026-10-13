import './style.css'
import { parseAmount, calculate } from './calc.js'

// ── Theme ──
const html = document.documentElement
const themeBtn = document.getElementById('theme-btn')

function applyTheme(theme) {
  html.dataset.theme = theme
  localStorage.setItem('tipjar-theme', theme)
}

const saved = localStorage.getItem('tipjar-theme')
if (saved === 'light' || saved === 'dark') applyTheme(saved)

themeBtn.addEventListener('click', () => {
  const isDark =
    html.dataset.theme === 'dark' ||
    (html.dataset.theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)
  applyTheme(isDark ? 'light' : 'dark')
})

// ── Currency formatting ──
function formatMoney(value) {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Show locale decimal separator hint in bill placeholder
try {
  const sample = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(1.5)
  const sep = sample[1] // '.' or ','
  document.getElementById('bill').placeholder = `0${sep}00`
} catch { /* keep default */ }

// ── Element refs ──
const billInput  = document.getElementById('bill')
const tipInput   = document.getElementById('tip')
const peopleInput = document.getElementById('people-input')
const roundupCheck = document.getElementById('roundup')
const presetBtns = document.querySelectorAll('.preset')
const decBtn = document.getElementById('people-dec')
const incBtn = document.getElementById('people-inc')

const outTip   = document.getElementById('out-tip')
const outTotal = document.getElementById('out-total')
const outPer   = document.getElementById('out-per')

const billErr   = document.getElementById('bill-err')
const tipErr    = document.getElementById('tip-err')
const peopleErr = document.getElementById('people-err')

// ── Preset buttons ──
let activeTip = '15'

function setPreset(tip) {
  activeTip = tip
  presetBtns.forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.tip === tip ? 'true' : 'false')
  })
  if (tip !== 'custom') {
    tipInput.value = tip
    tipInput.style.display = 'none'
  } else {
    tipInput.style.display = ''
    tipInput.value = ''
    tipInput.focus()
  }
  recalc()
}

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => setPreset(btn.dataset.tip))
})

tipInput.addEventListener('input', () => {
  activeTip = 'custom'
  presetBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.tip === 'custom' ? 'true' : 'false'))
  recalc()
})

// ── Stepper ──
decBtn.addEventListener('click', () => {
  const v = parseInt(peopleInput.value, 10)
  if (v > 1) { peopleInput.value = v - 1; recalc() }
})

incBtn.addEventListener('click', () => {
  const v = parseInt(peopleInput.value, 10) || 0
  if (v < 99) { peopleInput.value = v + 1; recalc() }
})

// ── Live recalc ──
billInput.addEventListener('input', recalc)
peopleInput.addEventListener('input', recalc)
roundupCheck.addEventListener('change', recalc)

function recalc() {
  billErr.textContent = ''
  tipErr.textContent = ''
  peopleErr.textContent = ''
  billInput.removeAttribute('aria-invalid')
  tipInput.removeAttribute('aria-invalid')
  peopleInput.removeAttribute('aria-invalid')

  const billStr = billInput.value.trim()
  const tipStr  = tipInput.style.display === 'none'
    ? (activeTip !== 'custom' ? activeTip : '0')
    : tipInput.value.trim()

  if (!billStr) {
    clearResults()
    return
  }

  const bill    = parseAmount(billStr)
  const tipPct  = parseAmount(tipStr)
  const people  = parseInt(peopleInput.value.trim(), 10)
  const roundUp = roundupCheck.checked

  const result = calculate({
    bill,
    tipPct,
    people: Number.isNaN(people) ? NaN : people,
    roundUp,
  })

  if ('error' in result) {
    if (result.error === 'bill') {
      billErr.textContent = bill === 0 ? 'Enter an amount greater than zero' : 'Enter a valid bill amount'
      billInput.setAttribute('aria-invalid', 'true')
    } else if (result.error === 'tip') {
      tipErr.textContent = 'Enter a tip percentage between 0 and 100'
      tipInput.setAttribute('aria-invalid', 'true')
    } else if (result.error === 'people') {
      peopleErr.textContent = 'Enter a number between 1 and 99'
      peopleInput.setAttribute('aria-invalid', 'true')
    }
    clearResults()
    return
  }

  outTip.textContent   = formatMoney(result.tip)
  outTotal.textContent = formatMoney(result.total)
  outPer.textContent   = formatMoney(result.perPerson)
}

function clearResults() {
  outTip.textContent = outTotal.textContent = outPer.textContent = '—'
}

// ── Initialise ──
setPreset('15')
recalc()
