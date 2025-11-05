let currentSlide = 0; // El índice de la diapositiva que se está mostrando.
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Función para mover el carrusel
function updateCarousel() {
    // Calcula la distancia que debe moverse el carril (track)
    // -currentSlide * 100% asegura que se mueva exactamente el ancho de una imagen
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
}

// Función que se llama al hacer clic en los botones
function moveSlide(direction) {
    currentSlide += direction; // direction será 1 (next) o -1 (prev)

    // Lógica para que el carrusel sea infinito (vuelva al inicio o al final)
    if (currentSlide >= totalSlides) {
        currentSlide = 0; // Vuelve al inicio
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Va al final
    }

    updateCarousel();
}

// Inicializa el carrusel al cargar la página
document.addEventListener('DOMContentLoaded', updateCarousel);