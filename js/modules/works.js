/* Trabajos: arma la grilla y los filtros a partir de js/data/works.js */
(function (FJC) {
  var PLACEHOLDER_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z"/></svg>';

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function cardHtml(item) {
    var media = item.image
      ? '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy">'
      : '<div class="work-card__placeholder">' + PLACEHOLDER_ICON + "</div>";

    return (
      '<article class="work-card" data-reveal data-category="' + escapeHtml(item.category) +
        '" data-tone="' + escapeHtml(item.tone || "violet") + '">' +
        media +
        '<div class="work-card__body">' +
          '<p class="work-card__cat">' + escapeHtml(item.category) + "</p>" +
          '<h3 class="work-card__title">' + escapeHtml(item.title) + "</h3>" +
          (item.meta ? '<p class="work-card__meta">' + escapeHtml(item.meta) + "</p>" : "") +
        "</div>" +
      "</article>"
    );
  }

  function init() {
    var grid = document.querySelector("[data-work-grid]");
    var filters = document.querySelector("[data-work-filters]");
    if (!grid || !FJC.works) return;

    grid.innerHTML = FJC.works.items.map(cardHtml).join("");
    FJC.reveal.observe(grid);

    if (!filters) return;
    filters.innerHTML = FJC.works.categories.map(function (cat, i) {
      return '<button type="button" role="tab" class="work__filter" data-filter="' + escapeHtml(cat) +
        '" aria-selected="' + (i === 0) + '">' + escapeHtml(cat) + "</button>";
    }).join("");

    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var cat = btn.dataset.filter;
      var showAll = cat === FJC.works.categories[0];

      filters.querySelectorAll("[data-filter]").forEach(function (b) {
        b.setAttribute("aria-selected", String(b === btn));
      });
      grid.querySelectorAll(".work-card").forEach(function (card) {
        card.classList.toggle("is-hidden", !showAll && card.dataset.category !== cat);
      });
    });
  }

  FJC.worksGrid = { init: init };
})(window.FJC);
