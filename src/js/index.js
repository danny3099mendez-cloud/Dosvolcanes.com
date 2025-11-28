/* index.js (versión corregida y defensiva) */

/* ===============================
   FUNCIONES: RESEÑAS
   ==============================*/
async function sendReview(e) {
  e.preventDefault();
  const form = document.querySelector("#review-form");
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
    if (form) form.reset();
  }
}

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

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Aún no hay reseñas publicadas.</p>";
    return;
  }

  data.forEach((r) => {
    const div = document.createElement("div");
    div.classList.add("review-card");

    const stars = "⭐".repeat(r.rating || 0);
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
   FUNCIONES: CONTACTO
   ==============================*/
async function sendMessage(e) {
  e.preventDefault();

  // obtener referencia al form para reset al final
  const form = document.querySelector("#contact-form");
  const name = document.querySelector("#contact-name").value.trim();
  const email = document.querySelector("#contact-email").value.trim();
  const message = document.querySelector("#contact-message").value.trim();

  // Validación básica
  if (!name || !email || !message) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const data = { name, email, message };

  try {
    // feedback en consola
    console.log('Enviando contacto:', data);

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

    alert('✅ Mensaje enviado con éxito. ¡Gracias por contactarnos!');
    if (form) form.reset();
  } catch (error) {
    console.error('❌ Error al enviar el formulario:', error);
    alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
  }
}

/* ===============================
   FUNCIONES: SUSCRIPCIÓN
   ==============================*/
async function subscribeEmail(e) {
  e.preventDefault();
  const form = document.querySelector("#newsletter-form");
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
    if (form) form.reset();
  }
}

/* ===============================
   INICIALIZACIÓN (con guards)
   ==============================*/
document.addEventListener("DOMContentLoaded", () => {
  // Guard global por idioma/página (evita inicializar dos veces si el mismo script se carga varias veces)
  const lang = (document.documentElement && document.documentElement.lang) ? document.documentElement.lang.toLowerCase() : 'default';
  const GLOBAL_FLAG = `__indexInitialized__${lang}`;
  if (window[GLOBAL_FLAG]) {
    console.warn('index ya inicializado para', lang);
    return;
  }
  window[GLOBAL_FLAG] = true;

  // Cargar reseñas
  loadReviews();

  // Seleccionar forms
  const reviewForm = document.querySelector("#review-form");
  const contactForm = document.querySelector("#contact-form");
  const newsletterForm = document.querySelector("#newsletter-form");

  // Añadir listeners con guard en el elemento para evitar duplicados
  if (reviewForm && !reviewForm.dataset.contactInit) {
    reviewForm.dataset.contactInit = 'true';
    reviewForm.addEventListener("submit", sendReview, { capture: true });
  }

  if (contactForm && !contactForm.dataset.contactInit) {
    contactForm.dataset.contactInit = 'true';
    contactForm.addEventListener("submit", sendMessage, { capture: true });
  }

  if (newsletterForm && !newsletterForm.dataset.contactInit) {
    newsletterForm.dataset.contactInit = 'true';
    newsletterForm.addEventListener("submit", subscribeEmail, { capture: true });
  }

  console.log('index inicializado (lang=' + lang + ').');
});
