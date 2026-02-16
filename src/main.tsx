// ══════════════════════════════════════
//  종전 후 — World Wiki · main.ts
//  Entry point (Vite + React)
// ══════════════════════════════════════
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// ── DOM 마운트 ──────────────────────
const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error(
    '[Wiki] #root 엘리먼트를 찾을 수 없습니다.\n' +
    'index.html에 <div id="root"></div>가 있는지 확인해주세요.',
  )
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)