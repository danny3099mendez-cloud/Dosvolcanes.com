const API_BASE = 'https://g5e1s2-ip-170-80-16-165.tunnelmole.net/api/';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

function getCounterEl() {
  return document.getElementById('showCounter');
}

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('visitor-counter fetch error:', err);
    throw err;
  }
}

async function fetchVisitCount() {
  try {
    const data = await safeFetch(`${API_BASE}visit-count`);
    const counterEl = getCounterEl();
    if (counterEl) counterEl.textContent = data.visits ?? '0';
  } catch (error) {
    const counterEl = getCounterEl();
    if (counterEl) counterEl.textContent = '—';
  }
}

async function incrementVisitCount() {
  try {
    const data = await safeFetch(`${API_BASE}visit-count`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'increment' })
    });
    const counterEl = getCounterEl();
    if (counterEl) counterEl.textContent = data.count ?? '0';
  } catch (error) {
    console.error('Error al incrementar visitas:', error);
  }
}

// Retry helper: espera hasta que #showCounter exista
function waitForCounterElement(timeout = 3000) {
  return new Promise((resolve) => {
    const el = getCounterEl();
    if (el) return resolve(el);
    const observer = new MutationObserver(() => {
      const found = getCounterEl();
      if (found) {
        observer.disconnect();
        resolve(found);
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    // fallback timeout
    setTimeout(() => {
      observer.disconnect();
      resolve(getCounterEl()); // may be null
    }, timeout);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // Espera al elemento si es necesario (por traducciones que manipulan DOM)
  await waitForCounterElement(2500);

  // Intentar incrementar y luego leer, con pequeñas esperas si falla
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await incrementVisitCount();
      await fetchVisitCount();
      break;
    } catch (err) {
      console.warn(`visitor-counter attempt ${attempt} failed`);
      if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, RETRY_DELAY));
      else {
        console.error('visitor-counter: all retries failed');
      }
    }
  }
});
