/* ===============================
   DETECTAR SESIÓN ACTIVA
=============================== */
checkSession();

async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data?.session) {
    showAdmin();
  }
}

/* ===============================
   LOGIN
=============================== */
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value.trim();
  const password = document.querySelector("#login-password").value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Error al iniciar sesión. Verifica correo o contraseña.");
    console.error(error);
    return;
  }

  showAdmin();
});

/* ===============================
   MOSTRAR PANEL AL LOGUEAR
=============================== */
function showAdmin() {
  document.querySelector("#login-section").style.display = "none";
  document.querySelector("#admin-panel").style.display = "block";
  loadData();
}

/* ===============================
   TABS DE ADMIN
=============================== */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

/* ===============================
   CARGA DE DATOS
=============================== */
async function loadData() {
  await loadResenas();
  // await loadMensajes();
  await loadSuscriptores();
}

/* Reseñas */
async function loadResenas() {
  const tbody = document.querySelector("#tabla-resenas tbody");
  tbody.innerHTML = "";
  const { data, error } = await supabase.from("resenas").select("*");
  if (error) return console.error(error);
  data.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.nombre}</td>
      <td>${r.comentario}</td>
      <td>${"⭐".repeat(r.rating)}</td>
      <td>${r.publicado ? "✅" : `<button data-id="${r.id}" class="publicar">Publicar</button>`}</td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".publicar").forEach((btn) =>
    btn.addEventListener("click", async () => {
      await supabase.from("resenas").update({ publicado: true }).eq("id", btn.dataset.id);
      loadResenas();
    })
  );
}

/* Mensajes */
async function loadMensajes() {
  const tbody = document.querySelector("#tabla-mensajes tbody");
  tbody.innerHTML = "";
  const { data, error } = await supabase.from("mensajes_contacto").select("*").order("created_at", { ascending: false });
  if (error) return console.error(error);
  data.forEach((m) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.nombre}</td>
      <td>${m.email}</td>
      <td>${m.mensaje}</td>
      <td>${new Date(m.created_at).toLocaleDateString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* Suscriptores */
async function loadSuscriptores() {
  const tbody = document.querySelector("#tabla-suscriptores tbody");
  tbody.innerHTML = "";
  const { data, error } = await supabase.from("suscriptores").select("*").order("created_at", { ascending: false });
  if (error) return console.error(error);
  data.forEach((s) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.email}</td><td>${new Date(s.created_at).toLocaleDateString()}</td>`;
    tbody.appendChild(tr);
  });
}
