
const API_BASE = 'https://rm3qyf-ip-170-80-16-166.tunnelmole.net';
const counterEl = document.getElementById('showCounter');

async function fetchVisitCount() {
    try {
        const response = await fetch(`${API_BASE}visit-count`);
        if (!response.ok) throw new Error('Error al obtener el contador');
        const data = await response.json();

        // ✅ Mostrar el valor en el span
        counterEl.textContent = data.visits ?? '0';
    } catch (error) {
        console.error('Error al actualizar el contador:', error);
        counterEl.textContent = '—';
    }
}

async function incrementVisitCount() {
    try {
        const response = await fetch(`${API_BASE}visit-count`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'increment' })
        });

        const data = await response.json();

        // ✅ Mostrar el valor actualizado
        counterEl.textContent = data.count ?? '0';
    } catch (error) {
        console.error('Error al incrementar visitas:', error);
    }
}

// -------------------------------
// Inicialización al cargar la página
// -------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    await incrementVisitCount(); // Incrementa una visita
    await fetchVisitCount();     // Muestra el valor actualizado en el span
});