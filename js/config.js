/* ==========================================================
   CONFIGURACIÓN DEL SITIO
   Todo lo que cambia seguido está acá: contacto, video, formulario.
   No hace falta tocar el HTML ni los módulos.
   ========================================================== */

window.FJC = window.FJC || {};

window.FJC.config = {
  contact: {
    // WhatsApp con código de país, sin "+" ni espacios. Ej Argentina: 54 9 11 2345 6789 → "5491123456789"
    whatsapp: "5493517452530", // 351 745-2530 (54 = Argentina, 9 = celular)
    whatsappGreeting: "Hola FJC Sonido! Quiero consultar por un presupuesto.",
    email: "contacto@fjcsonido.com", // ← CAMBIAR
    instagram: "https://www.instagram.com/fjcsonidos/"
  },

  showreel: {
    // Opción A: ID de YouTube (lo que va después de "watch?v=" en el link)
    youtubeId: "",
    // Opción B: video propio subido al hosting, ej "assets/video/showreel.mp4"
    videoSrc: "",
    // Imagen de portada antes de darle play (opcional), ej "assets/img/showreel-poster.jpg"
    poster: ""
  },

  form: {
    // Si querés recibir las consultas también por email, creá un form gratis en
    // https://formspree.io y pegá acá la URL (ej "https://formspree.io/f/abcdwxyz").
    // Si queda vacío, el formulario abre WhatsApp con la consulta ya escrita.
    endpoint: ""
  },

  // Opciones del selector "Tipo de evento" del formulario
  eventTypes: [
    "Cumpleaños",
    "Fiesta privada",
    "Casamiento",
    "Peña",
    "Show de banda / artista",
    "Evento de empresa",
    "Otro"
  ],

  // Chips de "¿Qué necesitás?"
  services: ["Sonido", "Iluminación", "Humo / efectos", "DJ", "Combo completo"]
};
