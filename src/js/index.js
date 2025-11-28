// js/index.js
//import { supabase } from "./supabase-client.js";

/* ===============================
   CARGAR IMÁGENES DEL CARRUSEL
================================ */


/* ===============================
   FORMULARIO DE RESEÑAS
================================ */
async function sendReview(e) {
  e.preventDefault();

  const name = document.querySelector("#review-name").value.trim();
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const comment = document.querySelector("#review-comment").value.trim();

  if (!name || !rating || !comment) {
    alert("Por favor completa todos los campos y selecciona una calificación.");
    return;
  }

  const { error } = await supabase.from("resenas").insert([
    {
      nombre: name,
      rating: parseInt(rating),
      comentario: comment,
    },
  ]);

  if (error) {
    console.error("Error enviando reseña:", error);
    alert("Hubo un problema al enviar tu reseña.");
  } else {
    alert("Gracias por tu reseña. Será publicada tras aprobación del administrador.");
    document.querySelector("#review-form").reset();
  }
}

/* ===============================
   MOSTRAR RESEÑAS PUBLICADAS
================================ */
async function loadReviews() {
  const container = document.querySelector("#reviewsList");
  if (!container) return;

  const { data, error } = await supabase
    .from("resenas")
    .select("*")
    .eq("publicado", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando reseñas:", error);
    return;
  }

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>Aún no hay reseñas publicadas.</p>";
    return;
  }

  data.forEach((r) => {
    const div = document.createElement("div");
    div.classList.add("review-card");

    const stars = "⭐".repeat(r.rating);
    div.innerHTML = `
      <h4>${r.nombre}</h4>
      <p class="stars">${stars}</p>
      <p>${r.comentario}</p>
      <span class="date">${new Date(r.created_at).toLocaleDateString()}</span>
    `;
    container.appendChild(div);
  });
}

/* ===============================
   FORMULARIO DE CONTACTO
================================ */
async function sendMessage(e) {
  e.preventDefault();

  const name = document.querySelector("#contact-name").value.trim();
  const email = document.querySelector("#contact-email").value.trim();
  const message = document.querySelector("#contact-message").value.trim();


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
    console.error('❌ Error al enviar el formulario:', error);
    alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
  }
}

/* ===============================
   SUSCRIPCIÓN
================================ */
async function subscribeEmail(e) {
  e.preventDefault();
  const email = document.querySelector("#newsletter-email").value.trim();

  if (!email) {
    alert("Introduce un correo válido.");
    return;
  }

  const { error } = await supabase
    .from("suscriptores")
    .upsert([{ email }], { onConflict: ["email"] });

  if (error) {
    console.error("Error al suscribirse:", error);
    alert("No se pudo procesar tu suscripción.");
  } else {
    alert("Gracias por suscribirte.");
    document.querySelector("#newsletter-form").reset();
  }
}

/* ===============================
   INICIALIZACIÓN
================================ */
document.addEventListener("DOMContentLoaded", () => {
 
  loadReviews();

  const reviewForm = document.querySelector("#review-form");
  const contactForm = document.querySelector("#contact-form");
  const newsletterForm = document.querySelector("#newsletter-form");

  if (reviewForm) reviewForm.addEventListener("submit", sendReview);
  if (contactForm) contactForm.addEventListener("submit", sendMessage);
  if (newsletterForm) newsletterForm.addEventListener("submit", subscribeEmail);
});
