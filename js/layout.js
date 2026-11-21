(function () {
  var S = sessionStorage, L = localStorage, C = window.TIENDA_CONFIG || {};
  function leer() { try { return JSON.parse(S.getItem("pal_eventos")) || []; } catch (e) { return []; } }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function res(p) {
    var r = [];
    if (p.page_title) r.push(p.page_title);
    if (p.item_list_name) r.push("lista: " + p.item_list_name);
    if (p.promotion_id) r.push("promo " + p.promotion_id);
    if (p.transaction_id) r.push("pedido " + p.transaction_id);
    if (p.items && p.items.length) r.push(p.items.slice(0, 2).map(function (i) { return i.item_name + (p.value !== undefined ? " ×" + i.quantity : ""); }).join(", ") + (p.items.length > 2 ? " +" + (p.items.length - 2) + " más" : ""));
    if (p.value !== undefined) r.push("valor " + Number(p.value).toLocaleString("es-CO") + " COP");
    if (p.shipping !== undefined) r.push("envío " + Number(p.shipping).toLocaleString("es-CO"));
    if (p.shipping_tier) r.push(p.shipping_tier);
    if (p.payment_type) r.push(p.payment_type);
    if (p.coupon) r.push("cupón " + p.coupon);
    if (p.tipo_cliente) r.push("cliente " + p.tipo_cliente);
    return r.join(" · ");
  }
  var d = document.createElement("aside"); d.id = "mon";
  d.innerHTML = '<div class="mon-cab"><strong>Monitor de eventos GA4</strong><button id="mon-t">Ocultar</button></div><div id="mon-cuerpo"><div id="mon-estado"></div><p><b>Origen de la visita:</b> <span id="mon-origen"></span></p><ol id="mon-ev"></ol><button id="mon-reset">Simular nuevo visitante</button></div>';
  document.body.appendChild(d);
  var ev = d.querySelector("#mon-ev"), st = d.querySelector("#mon-estado");
  function pintar() { ev.innerHTML = leer().map(function (e) { return "<li><time>" + esc(e.t) + "</time> <b>" + esc(e.n) + "</b><br><small>" + esc(e.r) + "</small></li>"; }).join("") || "<li><small>Sin eventos todavía.</small></li>"; }
  if (window.GA_ACTIVO) { st.className = "ok"; st.textContent = "Conectado a " + window.GA_ID + (C.DEBUG_MODE ? " · modo depuración" : ""); }
  else { st.className = "mal"; st.textContent = "Sin ID de medición: los eventos solo se muestran aquí. Edita js/config.js."; }
  if (!S.getItem("pal_origen")) {
    var q = new URLSearchParams(location.search), s = q.get("utm_source");
    S.setItem("pal_origen", s ? s + " / " + (q.get("utm_medium") || "(none)") + " · " + (q.get("utm_campaign") || "(none)") : "directo (sin UTM)");
  }
  d.querySelector("#mon-origen").textContent = S.getItem("pal_origen");
  var b = d.querySelector("#mon-t");
  function aplicar(o) { document.body.classList.toggle("mon-oculto", o); b.textContent = o ? "Mostrar" : "Ocultar"; }
  aplicar(L.getItem("pal_mon_oculto") === "1");
  b.onclick = function () { var o = !document.body.classList.contains("mon-oculto"); L.setItem("pal_mon_oculto", o ? "1" : "0"); aplicar(o); };
  d.querySelector("#mon-reset").onclick = function () {
    var h = location.hostname, partes = h.split("."), doms = [""];
    for (var i = 0; i < partes.length - 1; i++) { var x = partes.slice(i).join("."); doms.push(x, "." + x); }
    doms.push(h, "." + h);
    document.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (/^_ga/.test(n)) doms.forEach(function (dm) { document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/" + (dm ? ";domain=" + dm : ""); });
    });
    L.removeItem("paliverde_carrito"); L.removeItem("paliverde_cupon"); S.clear();
    location.href = "index.html";
  };
  window.Monitor = { log: function (n, p) {
    var e = leer(); e.unshift({ t: new Date().toLocaleTimeString("es-CO", { hour12: false }), n: n, r: res(p || {}) });
    S.setItem("pal_eventos", JSON.stringify(e.slice(0, 12))); pintar();
  } };
  window.actualizarContador = function () { var c = document.getElementById("nCarrito"); if (c) c.textContent = window.Carrito.cantidadTotal(); };
  actualizarContador(); pintar();
  window.Monitor.log("page_view", { page_title: document.title });
})();
