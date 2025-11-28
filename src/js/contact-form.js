// contact-form.js (versión resistente a dobles envíos)
const API_BASE = 'https://0ghkiu-ip-170-80-16-165.tunnelmole.net/api/';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return console.error('Formulario no encontrado en el DOM.');

  const submitBtn = form.querySelector('[type="submit"]');

  // Guard para evitar doble envío simultáneo
  let isSubmitting = false;

  form.addEventListener('submit', async (event) => {
    // Si otro listener se ejecuta primero y quiere cancelar, respetarlo:
    if (event.defaultPrevented) return;

    // Evitar que otros listeners de submit respondan también (opcional)
    // event.stopImmediatePropagation();

    event.preventDefault();

    // si ya se está enviando, ignorar
    if (isSubmitting) {
      console.warn('Solicitud ya en curso — ignorando envío adicional.');
      return;
    }

    const name = (form.querySelector('#contact-name') || {}).value?.trim() ?? '';
    const email = (form.querySelector('#contact-email') || {}).value?.trim() ?? '';
    const message = (form.querySelector('#contact-message') || {}).value?.trim() ?? '';

    if (!name || !email || !message) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const data = { name, email, message };

    try {
      isSubmitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.origText = submitBtn.innerText;
        submitBtn.innerText = 'Enviando...';
      }

      const response = await fetch(`${API_BASE}contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      // Mostrar feedback al usuario
      alert('Mensaje enviado con éxito. ¡Gracias por contactarnos!');

      // Limpiar el formulario (reset aseguran campos vuelvan a su estado)
      form.reset();

      // opcional: volver el foco al primer input
      const firstInput = form.querySelector('input, textarea, select');
      if (firstInput) firstInput.focus();

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        if (submitBtn.dataset.origText) submitBtn.innerText = submitBtn.dataset.origText;
      }
    }
  });
});
