// contact-form-robust.js
const API_BASE = 'https://tzrx6a-ip-152-231-35-137.tunnelmole.net/api/';

(function () {
  // --- util: alert deduplicado por 2s ---
  (function dedupeAlert() {
    const originalAlert = window.alert.bind(window);
    let lastMsg = null;
    let lastAt = 0;
    window.alert = function (msg) {
      const now = Date.now();
      if (msg === lastMsg && now - lastAt < 2000) {
        console.warn('Alert duplicado suprimido:', msg);
        return;
      }
      lastMsg = msg;
      lastAt = now;
      originalAlert(msg);
    };
  })();

  // --- utilities ---
  const safeLog = (...args) => {
    try { console.log(...args); } catch (e) {}
  };

  document.addEventListener('DOMContentLoaded', () => {
    const originalForm = document.getElementById('contact-form');
    if (!originalForm) {
      console.error('Formulario no encontrado en el DOM.');
      return;
    }

    // 1) Eliminar atributo onsubmit inline si existe
    if (originalForm.getAttribute('onsubmit')) {
      safeLog('Eliminando atributo onsubmit inline.');
      originalForm.removeAttribute('onsubmit');
    }

    // 2) Forzar que el botón submit no tenga onclick inline
    const submitBtn = originalForm.querySelector('[type="submit"]');
    if (submitBtn && submitBtn.getAttribute('onclick')) {
      safeLog('Eliminando onclick inline del botón submit.');
      submitBtn.removeAttribute('onclick');
    }

    // 3) Clonar el formulario para quitar event listeners previos (técnica común)
    const clone = originalForm.cloneNode(true); // deep clone; no listeners copied
    originalForm.parentNode.replaceChild(clone, originalForm);

    // 4) Neutralizar propiedades directas que puedan existir
    clone.onsubmit = null;

    // 5) Re-seleccionar elementos dentro del clone
    const form = document.getElementById('contact-form'); // ahora es el clone
    if (!form) {
      console.error('No pude recuperar el formulario tras clonar.');
      return;
    }
    const btn = form.querySelector('[type="submit"]');

    // 6) Variables de control
    let isSubmitting = false;

    // 7) Instrumentación: mostrar stack cuando se ejecuta el handler
    function debugTrace(note) {
      safeLog(`handler: ${note} — ${new Date().toISOString()}`);
      console.trace();
    }

    // 8) Elimina otros posibles listeners en document que reenvíen el form (opcional but safe)
    //    No tocamos listeners de terceros en document para no romper otras cosas, pero dejamos esto comentado:
    // document.removeEventListener('submit', someHandlerYouKnowAbout);

    // 9) Handler único y protegido
    async function handleSubmit(e) {
      // si otro listener ya canceló el submit, respetarlo
      if (e.defaultPrevented) {
        safeLog('submit ya fue preventDefault por otro listener, abortando.');
        return;
      }
      e.preventDefault();

      debugTrace('inicio');

      if (isSubmitting) {
        safeLog('Ignorando envío: petición ya en curso.');
        return;
      }

      const nameEl = form.querySelector('#contact-name');
      const emailEl = form.querySelector('#contact-email');
      const messageEl = form.querySelector('#contact-message');

      const name = (nameEl && nameEl.value || '').trim();
      const email = (emailEl && emailEl.value || '').trim();
      const message = (messageEl && messageEl.value || '').trim();

      if (!name || !email || !message) {
        alert('Por favor completa todos los campos.');
        return;
      }

      const payload = { name, email, message };

      try {
        isSubmitting = true;
        if (btn) {
          btn.disabled = true;
          btn.dataset._orig = btn.innerText;
          btn.innerText = 'Enviando...';
        }

        // LOG previo al fetch
        safeLog('Enviando payload:', payload);

        const res = await fetch(`${API_BASE}contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const result = await res.json();
        safeLog('Respuesta del servidor:', result);

        alert('Mensaje enviado con éxito. ¡Gracias por contactarnos!');
        form.reset();

        // Enfocar primer campo
        const first = form.querySelector('input, textarea, select');
        if (first) first.focus();

        debugTrace('fin correcto');

      } catch (err) {
        console.error('Error al enviar formulario:', err);
        alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
        debugTrace('fin error');
      } finally {
        isSubmitting = false;
        if (btn) {
          btn.disabled = false;
          if (btn.dataset._orig) btn.innerText = btn.dataset._orig;
          delete btn.dataset._orig;
        }
      }
    }

    // 10) Añadir el listener con capture true para que se ejecute antes de listeners bubble si existieran
    form.addEventListener('submit', handleSubmit, { capture: true });

    // 11) Protección adicional: interceptar clicks en el botón submit para prevenir envíos por doble-click rápido
    if (btn) {
      btn.addEventListener('click', (ev) => {
        // Si ya se está enviando, prevenir cualquier intento adicional
        if (isSubmitting) {
          ev.preventDefault();
          ev.stopPropagation();
          safeLog('Click ignorado — envío en curso');
        }
      }, { capture: true });
    }

    safeLog('contact-form-robust inicializado correctamente.');
  });
})();
