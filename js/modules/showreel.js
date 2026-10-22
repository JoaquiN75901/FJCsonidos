/* Showreel: portada con play que carga YouTube o un video propio recién al hacer clic
   (así la página carga rápido). Si no hay video configurado, muestra un placeholder. */
(function (FJC) {
  var PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';

  function youtubeEmbed(id) {
    return '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
      '?autoplay=1&rel=0&modestbranding=1" title="Showreel FJC Sonido" ' +
      'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  }

  function videoEmbed(src) {
    return '<video src="' + src + '" controls autoplay playsinline></video>';
  }

  function init() {
    var frame = document.querySelector("[data-showreel]");
    if (!frame) return;

    var cfg = FJC.config.showreel;
    var hasVideo = cfg.youtubeId || cfg.videoSrc;

    if (!hasVideo) {
      frame.innerHTML =
        '<div class="showreel__empty">' +
          '<div class="eq" data-eq data-bars="24"></div>' +
          "<p>Acá va el showreel de FJC Sonido</p>" +
        "</div>";
      FJC.equalizer.init(frame);
      return;
    }

    var poster = cfg.poster ||
      (cfg.youtubeId ? "https://i.ytimg.com/vi/" + encodeURIComponent(cfg.youtubeId) + "/maxresdefault.jpg" : "");

    frame.innerHTML =
      '<button type="button" class="showreel__poster" aria-label="Reproducir showreel"' +
        (poster ? ' style="background-image:url(\'' + poster + '\')"' : "") + ">" +
        '<span class="showreel__play">' + PLAY_ICON + "</span>" +
        '<span class="showreel__label">Showreel FJC Sonido</span>' +
      "</button>";

    frame.querySelector(".showreel__poster").addEventListener("click", function () {
      frame.innerHTML = cfg.youtubeId ? youtubeEmbed(cfg.youtubeId) : videoEmbed(cfg.videoSrc);
    }, { once: true });
  }

  FJC.showreel = { init: init };
})(window.FJC);
