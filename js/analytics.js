(function () {
  var C = window.TIENDA_CONFIG || {}, id = String(C.GA_MEASUREMENT_ID || "");
  var ok = /^G-[A-Za-z0-9]{4,}$/.test(id) && id !== "G-XXXXXXXXXX";
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.GA_ACTIVO = ok; window.GA_ID = id;
  if (ok) {
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    gtag("js", new Date());
    if (C.DEBUG_MODE === true) gtag("config", id, { debug_mode: true }); else gtag("config", id);
  }
  function reg(n, p) { if (window.Monitor) window.Monitor.log(n, p); }
  // Envía un evento (y lo muestra en el monitor).
  window.enviarEvento = function (n, p) {
    p = p || {}; p.currency = "COP"; reg(n, p);
    if (ok) gtag("event", n, p);
  };
  // Envía un evento y luego navega a url (callback, timeout de 1000 ms y respaldo de 1200 ms).
  window.enviarYNavegar = function (n, p, url) {
    var listo = false;
    function ir() { if (listo) return; listo = true; location.href = url; }
    p = p || {}; p.currency = "COP"; reg(n, p);
    if (!ok) { ir(); return; }
    p.event_callback = ir; p.event_timeout = 1000;
    gtag("event", n, p);
    setTimeout(ir, 1200);
  };
})();
