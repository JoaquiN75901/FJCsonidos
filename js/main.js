/* Punto de entrada: inicializa cada módulo.
   Para sumar un módulo nuevo: creá js/modules/mi-modulo.js,
   cargalo en index.html antes de este archivo y agregalo a la lista. */
(function (FJC) {
  var modules = [
    FJC.contactLinks,
    FJC.nav,
    FJC.reveal,
    FJC.equalizer,
    FJC.showreel,
    FJC.worksGrid,
    FJC.quoteForm
  ];

  modules.forEach(function (mod) {
    if (!mod || typeof mod.init !== "function") return;
    try {
      mod.init();
    } catch (err) {
      // Un módulo con error no rompe el resto de la página
      console.error("[FJC] Error iniciando módulo:", err);
    }
  });
})(window.FJC);
