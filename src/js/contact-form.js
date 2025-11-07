// contact-form.js
const API_BASE = 'https://7h1ysb-ip-170-80-16-166.tunnelmole.net/api/';

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  if (!form) return console.error('Formulario no encontrado en el DOM.');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita recargar la página

    // Obtener los valores del formulario
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    // Validación básica
    if (!name || !email || !message) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Construir el cuerpo del POST
    const data = { name, email, message };

    try {
      const response = await fetch(`${API_BASE}contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const result = await response.json();

      console.log(result)

      // Mostrar mensaje al usuario (puedes personalizar esto)
      alert('✅ Mensaje enviado con éxito. ¡Gracias por contactarnos!');
      console.log('Respuesta del servidor:', result);

      // Limpiar el formulario
      form.reset();
    } catch (error) {
      console.error(' Error al enviar el formulario:', error);
      alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
    }
  });
});
