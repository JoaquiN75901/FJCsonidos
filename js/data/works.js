/* ==========================================================
   TRABAJOS REALIZADOS
   Para sumar uno, copiá un bloque y cambiá los datos.
   - image: ruta a la foto (ej "assets/img/trabajos/quince-sofia.jpg").
            Si queda vacía, se muestra un fondo de color con ícono.
   - category: tiene que coincidir con una de "categories".
   - tone: color del fondo cuando no hay foto ("violet" | "cyan" | "gold").
   ========================================================== */

window.FJC = window.FJC || {};

window.FJC.works = {
  categories: ["Todos", "Fiestas", "Bandas", "Empresas"],

  items: [
    { title: "Banda en vivo",        category: "Bandas",   meta: "Sonido en vivo + monitoreo",  image: "", tone: "cyan"   },
    { title: "Fiesta de fin de año", category: "Empresas", meta: "Sonido + DJ",                 image: "", tone: "gold"   },
    { title: "Cumpleaños", category: "Fiestas",  meta: "Combo completo",              image: "", tone: "cyan"   },
    { title: "Peña folclórica",      category: "Fiestas",  meta: "Sonido + iluminación",        image: "", tone: "gold"   },
    { title: "Lanzamiento de marca", category: "Empresas", meta: "Sonido + luces",              image: "", tone: "violet" }
  ]
};
