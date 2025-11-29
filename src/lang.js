// lang.js
// Traducciones ES / EN para index.html
// Guarda el idioma en localStorage ("lang")
// Cambia video, placeholder, textos y respuestas del chatbot.

(function () {
  const translations = {
    es: {
      meta_title: "Descubre Ometepe - Guía de Turismo Local",
      visitas_text: "Visitas totales: <span id=\"showCounter\">0</span>",
      nav_inicio: "Inicio",
      nav_alojamiento: "Alojamiento",
      nav_transporte: "Transporte",
      nav_ferry: "Ferrys",
      nav_explora: "Explora",
      nav_mapa: "Mapa",
      nav_contacto: "Contacto",
      hero_title: "Bienvenido a la Isla de Ometepe",
      hero_subtitle: "Dos volcanes, un paraíso. Explora sus maravillas naturales y culturales.",
      ferry_video_title: "Bienvenidos a Ometepe",
      ferry_funfact: "<strong>Dato Curioso:</strong> La isla de Ometepe es la única isla del mundo con dos volcanes dentro de un mismo lago de agua dulce",
      alojamiento_title: "Hoteles y Restaurantes",
      alojamiento_card1_title: "Alojamiento",
      alojamiento_card1_text: "Desde hostales económicos hasta lodges de lujo, encuentra tu lugar ideal para descansar después de la aventura.",
      link_paraiso: "Eco-Lodge Paraíso (Isla de Ometepe)",
      link_hotel_volcan: "Hotel Volcán (Altagracia)",
      link_hostal_viajero: "Hostal El Viajero (Moyogalpa)",
      gastronomia_title: "Gastronomía Local",
      gastronomia_text: "Prueba el pescado frito fresco, el vigorón y los deliciosos platos típicos nicaragüenses.",
      link_dona_maria: "Comedor Doña María",
      link_la_casona: "Restaurante La Casona",
      link_mirador: "Café El Mirador",
      transporte_title: "Renta de Vehículos y Motocicletas",
      transporte_motos_title: "Motos (Recomendado)",
      transporte_motos_text: "Perfectas para acceder a todos los rincones de Ometepe. Asegúrate de tener licencia.",
      contacto_label: "Contacto:",
      transporte_coches_title: "Automóviles (4x4 Sugerido)",
      transporte_coches_text: "Necesario para grupos grandes o mayor comodidad, especialmente en la temporada de lluvia.",
      contacto_label_2: "Contacto:",
      ferry_info_title: "Ferrys: Moyogalpa - San Jorge",
      ferry_proceso_title: "Proceso de Reservación y Compra",
      ferry_step1: "Llega al puerto de San Jorge o Moyogalpa una hora antes.",
      ferry_step2: "Compra boletos en taquilla (pasajeros o vehículos).",
      ferry_step3: "Presenta matrícula y licencia si llevas vehículo.",
      ferry_step4: "Embarque: primero vehículos, luego pasajeros.",
      ferry_step5: "Duración: entre 1h y 1h 30m.",
      ferry_tip: "TIP: Los horarios varían. Consulta cartelera al llegar al puerto.",
      actividades_title: "Lo que No Te Puedes Perder",
      act_ojodeagua_title: "Ojo de Agua",
      act_ojodeagua_text: "Una piscina natural alimentada por un manantial volcánico, perfecta para un refrescante baño.",
      act_cascada_title: "Cascada San Ramón",
      act_cascada_text: "Un sendero de 3 km lleva a esta impresionante caída de agua de 50 metros.",
      act_punta_title: "Punta Jesús María",
      act_punta_text: "Un estrecho istmo de arena con vistas inigualables de los volcanes.",
      act_charco_title: "Reserva Charco Verde",
      act_charco_text: "Laguna esmeralda ideal para observar monos, aves y disfrutar la naturaleza.",
      reviews_title: "Deja tu reseña",
      review_name_label: "Tu nombre:",
      review_rating_label: "Tu calificación:",
      review_comment_label: "Tu comentario:",
      review_submit: "Enviar reseña",
      map_title: "Ubicación Geográfica de Ometepe",
      contacto_title: "Contáctanos",
      contacto_info_title: "Información de Contacto",
      telefono_label: "Teléfono:",
      email_label: "Email:",
      direccion_label: "Dirección:",
      newsletter_title: "Suscribete a nuestro boletin",
      newsletter_label: "Hazlo ahora!!:",
      newsletter_submit: "Suscribirme",
      contact_name_label: "Nombre:",
      contact_email_label: "Correo electrónico:",
      contact_message_label: "Mensaje:",
      contact_submit: "Enviar mensaje",
      chat_header: "Chat - DosVolcanes",
      footer_text: "© 2025 Dosvolcanes Todos los derechos reservados.",
      // chatbot responses (keywords simplified, normalized without accents)
      chatResponses: [
        { keywords: ["hola","buenas","saludos","que tal"], answer: "¡Hola! Bienvenido a DosVolcanes.com. ¿En qué te puedo ayudar sobre Ometepe?" },
        { keywords: ["alojamiento","hotel","hostal","hospedaje"], answer: "En Ometepe hay varios lugares: Hostal El Viajero, Hotel Volcán y Eco-Lodge Paraíso." },
        { keywords: ["comida","restaurante","gastronomia"], answer: "Puedes probar el pescado frito, el vigorón o visitar La Casona, Doña María y Café El Mirador." },
        { keywords: ["transporte","moto","carro","vehiculo"], answer: "Puedes rentar motos con Rentas 'El Veloz' o vehículos 4x4 con Ometepe Car Rental." },
        { keywords: ["ferry","barco","puerto"], answer: "Los ferrys salen entre Moyogalpa y San Jorge. Llega una hora antes y compra tu boleto en taquilla." },
        { keywords: ["actividad","explora","turismo"], answer: "Puedes visitar el Ojo de Agua, Cascada San Ramón, Punta Jesús María y Charco Verde." },
        { keywords: ["mapa","ubicacion","direccion"], answer: "Puedes ver la ubicación en la sección 'Ubicación Geográfica de Ometepe' dentro de la página." },
        { keywords: ["contacto","telefono","email","whatsapp"], answer: "Puedes contactarnos al +505 5821-5395 o escribirnos a info@dosvolcanes.com" },
        { keywords: ["gracias","adios"], answer: "¡Con gusto! Que tengas un excelente viaje por Ometepe." },
        { keywords: ["donde queda","pais","nicaragua"], answer: "Ometepe queda en Nicaragua 🇳🇮, dentro del Lago Cocibolca, formada por los volcanes Concepción y Maderas." }
      ],
      chatFallback: "No estoy seguro de eso, pero puedo ayudarte con alojamiento, transporte, ferrys, actividades o el mapa de Ometepe."
    },
    en: {
      meta_title: "Discover Ometepe - Local Tourism Guide",
      visitas_text: "Total visits: <span id=\"showCounter\">0</span>",
      nav_inicio: "Home",
      nav_alojamiento: "Lodging",
      nav_transporte: "Transportation",
      nav_ferry: "Ferries",
      nav_explora: "Explore",
      nav_mapa: "Map",
      nav_contacto: "Contact",
      hero_title: "Welcome to Ometepe Island",
      hero_subtitle: "Two volcanoes, one paradise. Discover its natural and cultural wonders.",
      ferry_video_title: "Welcome to Ometepe",
      ferry_funfact: "<strong>Fun Fact:</strong> Ometepe Island is the only island in the world with two volcanoes within the same freshwater lake.",
      alojamiento_title: "Hotels and Restaurants",
      alojamiento_card1_title: "Accommodation",
      alojamiento_card1_text: "From budget hostels to luxury eco-lodges, find the perfect place to relax after your adventure.",
      link_paraiso: "Eco-Lodge Paraíso (Ometepe Island)",
      link_hotel_volcan: "Hotel Volcán (Altagracia)",
      link_hostal_viajero: "Hostal El Viajero (Moyogalpa)",
      gastronomia_title: "Local Cuisine",
      gastronomia_text: "Try the fresh fried fish, vigorón, and other delicious Nicaraguan dishes.",
      link_dona_maria: "La Casona Restaurant",
      link_la_casona: "Doña María’s Diner",
      link_mirador: "El Mirador Café",
      transporte_title: "Vehicle and Motorcycle Rentals",
      transporte_motos_title: "Motorbikes (Recommended)",
      transporte_motos_text: "Perfect to explore every corner of Ometepe. Make sure to have a valid license.",
      contacto_label: "Contact:",
      transporte_coches_title: "Cars (4x4 Suggested)",
      transporte_coches_text: "Ideal for large groups or extra comfort, especially during the rainy season.",
      contacto_label_2: "Contact:",
      ferry_info_title: "Ferries: Moyogalpa - San Jorge",
      ferry_proceso_title: "Booking and Boarding Process",
      ferry_step1: "Arrive at the San Jorge or Moyogalpa port one hour before departure.",
      ferry_step2: "Buy tickets at the counter (passengers or vehicles).",
      ferry_step3: "Present your registration and license if traveling with a vehicle.",
      ferry_step4: "Boarding: vehicles first, then passengers.",
      ferry_step5: "Duration: between 1h and 1h 30m.",
      ferry_tip: "TIP: Schedules may change. Check the information board at the port.",
      actividades_title: "Must-See Attractions",
      act_ojodeagua_title: "Ojo de Agua",
      act_ojodeagua_text: "A natural pool fed by volcanic springs, perfect for a refreshing swim.",
      act_cascada_title: "San Ramón Waterfall",
      act_cascada_text: "A 3 km trail leads to this impressive 50-meter waterfall.",
      act_punta_title: "Punta Jesús María",
      act_punta_text: "A narrow sand isthmus offering breathtaking views of the volcanoes.",
      act_charco_title: "Charco Verde Reserve",
      act_charco_text: "An emerald lagoon ideal for spotting monkeys, birds, and enjoying nature.",
      reviews_title: "Leave your review",
      review_name_label: "Your name:",
      review_rating_label: "Your rating:",
      review_comment_label: "Your comment:",
      review_submit: "Send review",
      map_title: "Geographic Location of Ometepe",
      contacto_title: "Contact Us",
      contacto_info_title: "Contact Information",
      telefono_label: "Phone:",
      email_label: "Email:",
      direccion_label: "Address:",
      newsletter_title: "Subscribe to our newsletter",
      newsletter_label: "Do it now!!:",
      newsletter_submit: "Subscribe",
      contact_name_label: "Name:",
      contact_email_label: "Email:",
      contact_message_label: "Message:",
      contact_submit: "Send Message",
      chat_header: "Chat - DosVolcanes",
      footer_text: "© 2025 Dosvolcanes All rights reserved.",
      chatResponses: [
        { keywords: ["hello","hi","hey","greetings"], answer: "Hi there! Welcome to DosVolcanes.com. How can I help you with your trip to Ometepe?" },
        { keywords: ["hotel","lodging","stay","hostel"], answer: "In Ometepe, you can stay at Hostal El Viajero, Hotel Volcán, or Eco-Lodge Paraíso." },
        { keywords: ["food","restaurant","meal"], answer: "You can try fried fish, vigorón, or visit La Casona, Doña María, or El Mirador Café." },
        { keywords: ["transport","motorbike","car"], answer: "You can rent motorbikes at 'El Veloz Rentals' or 4x4 vehicles at Ometepe Car Rental." },
        { keywords: ["ferry","boat","port"], answer: "Ferries run between Moyogalpa and San Jorge. Arrive an hour early and buy your ticket at the terminal." },
        { keywords: ["activity","explore","tourism"], answer: "You can visit Ojo de Agua, San Ramón Waterfall, Punta Jesús María, and Charco Verde." },
        { keywords: ["map","location","address"], answer: "You can find the map in the 'Geographic Location of Ometepe' section on this website." },
        { keywords: ["contact","phone","email","whatsapp"], answer: "You can contact us at +505 5821-5395 or email info@dosvolcanes.com" },
        { keywords: ["thanks","bye"], answer: "You're welcome! Have an amazing trip to Ometepe." },
        { keywords: ["where is","nicaragua","country"], answer: "Ometepe is in Nicaragua 🇳🇮, inside Lake Cocibolca and formed by the Concepción and Maderas volcanoes." }
      ],
      chatFallback: "I'm not sure about that, but I can help you with lodging, transport, ferries, activities, or maps of Ometepe.",
      // video ids (es / en)
      video_es: "https://www.youtube.com/embed/n4g-2HsKaDg",
      video_en: "https://www.youtube.com/embed/E9cju2NASi4"
    }
  };

  // ---- apply translations ----
  function applyTranslations(lang) {
    const t = translations[lang] || translations.es;
    // set global for other scripts
    window.currentLang = lang;
    window.chatResponses = t.chatResponses;
    window.chatFallback = t.chatFallback || "";
    // update document title
    if (t.meta_title) document.title = t.meta_title;
    // update all data-key elements
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (!key) return;
      const value = t[key];
      if (typeof value === "undefined") return;
      // keep innerHTML for some keys (like visitas_text with span)
      el.innerHTML = value;
    });
    // placeholders (special cases)
    const newsletter = document.getElementById("newsletter-email");
    if (newsletter) {
      const ph = (lang === "en") ? "Your email address" : "Tu correo electrónico";
      newsletter.placeholder = ph;
    }
    const reviewName = document.getElementById("review-name");
    if (reviewName) reviewName.placeholder = (lang === "en") ? "Enter your name" : "Ingresa tu nombre";
    const reviewComment = document.getElementById("review-comment");
    if (reviewComment) reviewComment.placeholder = (lang === "en") ? "Write your experience..." : "Escribe tu experiencia...";
    const contactName = document.getElementById("contact-name");
    if (contactName) contactName.placeholder = (lang === "en") ? "Your Name" : "Tu nombre completo";
    const contactEmail = document.getElementById("contact-email");
    if (contactEmail) contactEmail.placeholder = (lang === "en") ? "Your Email" : "tunombre@email.com";
    const contactMessage = document.getElementById("contact-message");
    if (contactMessage) contactMessage.placeholder = (lang === "en") ? "Your Message" : "Escribe tu mensaje...";

    // set video src according to lang
    const heroVideo = document.getElementById("heroVideo");
    if (heroVideo) {
      heroVideo.src = t.video_es ? (lang === "en" ? t.video_en : t.video_es) : heroVideo.src;
    }

    // WhatsApp link: we keep Spanish message (user choice). (no change)

    // update chatbot input placeholder and send button
    const userInput = document.getElementById("user-input");
    if (userInput) userInput.placeholder = (lang === "en") ? "Type your question..." : "Escribe tu pregunta...";
    const sendBtn = document.getElementById("send-btn");
    if (sendBtn) sendBtn.textContent = (lang === "en") ? "Send" : "Enviar";

    // store selection
    localStorage.setItem("lang", lang);
    // set html lang attribute
    document.documentElement.lang = (lang === "en") ? "en" : "es";
  }

  // public setter
  window.setLanguage = function (lang) {
    if (!translations[lang]) lang = "es";
    applyTranslations(lang);
  };

  // init: apply saved or default
  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("lang") || "es";
    window.setLanguage(saved);

    // If no saved and default is es, nothing else to do.
    // make sure chatResponses available to chatbot code
  });

  // expose translations for debugging
  window._translations = translations;
})();
