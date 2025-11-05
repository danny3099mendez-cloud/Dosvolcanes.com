// Índices iniciales
let slideIndex1 = 0; // Carrusel principal
let slideIndex2 = 0; // Carrusel de actividades

// Timers
let timer1;
let timer2;

// ======== Funciones generales ========

// Muestra la imagen correspondiente
function showSlide(carouselId, index) {
  const slides = getSlides(carouselId);
  if (!slides.length) return;

  slides.forEach(slide => slide.classList.remove("active"));

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides[index].classList.add("active");

  if (carouselId === 1) slideIndex1 = index;
  else slideIndex2 = index;
}

// Obtiene los slides según el carrusel
function getSlides(carouselId) {
  return carouselId === 1
    ? document.querySelectorAll("#carouselTrack .slide-item")
    : document.querySelectorAll("#carouselActividadesTrack .actividad-slide");
}

// Mueve manualmente las diapositivas
function moveSlide(carouselId, step) {
  clearTimeout(carouselId === 1 ? timer1 : timer2);

  if (carouselId === 1) {
    showSlide(1, slideIndex1 + step);
    timer1 = setTimeout(() => autoSlide(1), 3500);
  } else {
    showSlide(2, slideIndex2 + step);
    timer2 = setTimeout(() => autoSlide(2), 3500);
  }
}

// Avanza automáticamente las diapositivas
function autoSlide(carouselId) {
  if (carouselId === 1) {
    showSlide(1, slideIndex1 + 1);
    timer1 = setTimeout(() => autoSlide(1), 3500);
  } else {
    showSlide(2, slideIndex2 + 1);
    timer2 = setTimeout(() => autoSlide(2), 3500);
  }
}

// ======== Inicialización ========
window.addEventListener("DOMContentLoaded", () => {
  // Carrusel principal
  const slides1 = getSlides(1);
  if (slides1.length) {
    slides1[0].classList.add("active");
    timer1 = setTimeout(() => autoSlide(1), 3500);
  }

  // Carrusel de actividades
  const slides2 = getSlides(2);
  if (slides2.length) {
    slides2[0].classList.add("active");
    timer2 = setTimeout(() => autoSlide(2), 3500);
  }
});
