/* Completa todos los links de WhatsApp, Instagram y email desde config.js */
(function (FJC) {
  function whatsappUrl(text) {
    var msg = text || FJC.config.contact.whatsappGreeting;
    return "https://wa.me/" + FJC.config.contact.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  function init() {
    var c = FJC.config.contact;

    document.querySelectorAll("[data-whatsapp-link]").forEach(function (a) {
      a.href = whatsappUrl();
    });
    document.querySelectorAll("[data-instagram-link]").forEach(function (a) {
      a.href = c.instagram;
    });
    document.querySelectorAll("[data-email-link]").forEach(function (a) {
      a.href = "mailto:" + c.email;
    });
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  FJC.contactLinks = { init: init, whatsappUrl: whatsappUrl };
})(window.FJC);
