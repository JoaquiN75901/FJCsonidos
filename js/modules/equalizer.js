/* Genera las barras del ecualizador animado en cada [data-eq] */
(function (FJC) {
  function build(el, bars) {
    var count = bars || Number(el.dataset.bars) || 18;
    var html = "";
    for (var i = 0; i < count; i++) {
      var peak = (0.35 + Math.random() * 0.65).toFixed(2);
      var delay = (-Math.random() * 1.2).toFixed(2);
      var duration = (0.6 + Math.random() * 0.9).toFixed(2);
      html += '<span class="eq__bar" style="--peak:' + peak +
        ";animation-delay:" + delay + "s;animation-duration:" + duration + 's"></span>';
    }
    el.innerHTML = html;
  }

  function init(root) {
    (root || document).querySelectorAll("[data-eq]").forEach(function (el) { build(el); });
  }

  FJC.equalizer = { init: init };
})(window.FJC);
