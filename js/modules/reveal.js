/* Animación de aparición al scrollear para todo elemento con [data-reveal] */
(function (FJC) {
  var observer;

  function observe(root) {
    var els = (root || document).querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!observer) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    els.forEach(function (el) { observer.observe(el); });
  }

  function init() {
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    observe(document);
  }

  // observe() queda expuesto para contenido que se agrega después (ej: trabajos)
  FJC.reveal = { init: init, observe: observe };
})(window.FJC);
