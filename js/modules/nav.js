/* Header: fondo al scrollear + menú móvil */
(function (FJC) {
  function init() {
    var header = document.querySelector("[data-header]");
    var nav = document.querySelector("[data-nav]");
    var toggle = document.querySelector("[data-nav-toggle]");
    if (!header || !nav || !toggle) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Cerrar al elegir un link o con Escape
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  FJC.nav = { init: init };
})(window.FJC);
