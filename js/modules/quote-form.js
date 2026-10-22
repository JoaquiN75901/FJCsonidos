/* Formulario de presupuesto
   - Arma las opciones (tipo de evento y servicios) desde config.js
   - Valida los campos obligatorios
   - Envía: a Formspree si hay endpoint configurado; si no, abre WhatsApp con la consulta escrita
   - Los links con [data-preset-event] preseleccionan el tipo de evento */
(function (FJC) {
  var form, successBox, retryLink, submitBtn;

  function populate() {
    var select = form.querySelector("[data-event-select]");
    FJC.config.eventTypes.forEach(function (type) {
      var opt = document.createElement("option");
      opt.textContent = type;
      select.appendChild(opt);
    });

    var chips = form.querySelector("[data-service-chips]");
    chips.innerHTML = FJC.config.services.map(function (s) {
      return '<label class="chip"><input type="checkbox" name="servicios" value="' + s + '"><span>' + s + "</span></label>";
    }).join("");

    // La fecha no puede ser anterior a hoy
    var date = form.querySelector('[name="fecha"]');
    if (date) {
      var now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // fecha local, no UTC
      date.min = now.toISOString().split("T")[0];
    }
  }

  function bindPresets() {
    document.querySelectorAll("[data-preset-event]").forEach(function (link) {
      link.addEventListener("click", function () {
        var select = form.querySelector('[name="evento"]');
        select.value = link.dataset.presetEvent;
        clearError(select);
      });
    });
  }

  /* ---------- Validación ---------- */
  var rules = {
    nombre: function (v) { return v.trim().length >= 2 || "Contanos tu nombre."; },
    telefono: function (v) { return v.replace(/\D/g, "").length >= 8 || "Dejanos un WhatsApp válido para responderte."; },
    evento: function (v) { return !!v || "Elegí el tipo de evento."; }
  };

  function setError(field, msg) {
    field.closest(".field").classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    form.querySelector('[data-error-for="' + field.name + '"]').textContent = msg;
  }

  function clearError(field) {
    var wrap = field.closest(".field");
    if (!wrap || !wrap.classList.contains("has-error")) return;
    wrap.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    form.querySelector('[data-error-for="' + field.name + '"]').textContent = "";
  }

  function validate() {
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      var result = rules[name](field.value);
      if (result === true) {
        clearError(field);
      } else {
        setError(field, result);
        firstInvalid = firstInvalid || field;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  /* ---------- Envío ---------- */
  function collect() {
    var data = new FormData(form);
    return {
      nombre: data.get("nombre").trim(),
      telefono: data.get("telefono").trim(),
      evento: data.get("evento"),
      fecha: data.get("fecha"),
      invitados: data.get("invitados"),
      lugar: data.get("lugar").trim(),
      servicios: data.getAll("servicios"),
      mensaje: data.get("mensaje").trim()
    };
  }

  function formatDate(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  function buildMessage(d) {
    var lines = [
      "Hola FJC Sonido! Quiero pedir un presupuesto 🎶",
      "",
      "• Nombre: " + d.nombre,
      "• Evento: " + d.evento
    ];
    if (d.fecha) lines.push("• Fecha: " + formatDate(d.fecha));
    if (d.invitados) lines.push("• Invitados: " + d.invitados);
    if (d.lugar) lines.push("• Lugar: " + d.lugar);
    if (d.servicios.length) lines.push("• Necesito: " + d.servicios.join(", "));
    if (d.mensaje) lines.push("", d.mensaje);
    return lines.join("\n");
  }

  function showSuccess(waUrl) {
    retryLink.href = waUrl;
    successBox.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar otra consulta";
    successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    var data = collect();
    var waUrl = FJC.contactLinks.whatsappUrl(buildMessage(data));
    var endpoint = FJC.config.form.endpoint;

    // Hook para analítica (Google Analytics / Meta Pixel), si existe
    if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { event_type: data.evento });
    if (typeof window.fbq === "function") window.fbq("track", "Lead");

    if (!endpoint) {
      // Sin backend: abre WhatsApp con todo el detalle
      window.open(waUrl, "_blank", "noopener");
      showSuccess(waUrl);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.assign({}, data, { servicios: data.servicios.join(", ") }))
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        showSuccess(waUrl);
        form.reset();
      })
      .catch(function () {
        // Si falla el envío por email, no perdemos el lead: lo mandamos a WhatsApp
        window.open(waUrl, "_blank", "noopener");
        showSuccess(waUrl);
      });
  }

  function init() {
    form = document.querySelector("[data-quote-form]");
    if (!form) return;
    successBox = form.querySelector("[data-form-success]");
    retryLink = form.querySelector("[data-whatsapp-retry]");
    submitBtn = form.querySelector("[data-submit]");

    populate();
    bindPresets();
    form.addEventListener("submit", onSubmit);
    form.addEventListener("input", function (e) { clearError(e.target); });
    form.addEventListener("change", function (e) { clearError(e.target); });
  }

  FJC.quoteForm = { init: init };
})(window.FJC);
