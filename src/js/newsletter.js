//const API_BASE = 'https://hayjca-ip-170-80-16-165.tunnelmole.net/api/';

document.addEventListener("DOMContentLoaded", () => {
    const newsletterForm = document.querySelector("#newsletter-form");

    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#newsletter-email").value.trim();

        if (!email) {
            alert("Por favor, escribe un correo válido.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}newsletter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error("Error al suscribirse.");
            }

            alert("¡Gracias por suscribirte al boletín!");
            newsletterForm.reset();

        } catch (error) {
            alert("Hubo un error, intenta nuevamente.");
            console.error(error);
        }
    });
});
