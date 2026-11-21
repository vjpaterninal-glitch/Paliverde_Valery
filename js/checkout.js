(function () {
  var app = document.getElementById("app");
  if (!Carrito.lineas().length) { app.innerHTML = '<h1>Checkout</h1><p class="aviso">No hay productos. <a href="index.html">Ir al catálogo</a></p>'; return; }
  var PAISES = ["Colombia", "México", "Perú", "Chile", "Argentina", "España", "Estados Unidos"];
  var t = Carrito.totales(), cup = Carrito.cuponActivo();
  function base() { var o = { value: t.productos, items: Carrito.itemsGA() }; if (cup) o.coupon = Carrito.CODIGO; return o; }
  app.innerHTML = '<h1>Checkout</h1><div class="cols"><div>' +
    '<section id="paso1"><h2>Paso 1 · Envío</h2><label>Nombre ficticio<input id="nombre" placeholder="Ej.: Cliente Prueba" autocomplete="off"></label><p><small>No escribas datos reales: no se envía ni se guarda el nombre.</small></p>' +
    '<label>País<select id="pais">' + PAISES.map(function (p) { return "<option>" + p + "</option>"; }).join("") + '</select></label>' +
    '<label><input type="radio" name="serv" value="Estándar" checked> Estándar</label> <label><input type="radio" name="serv" value="Express"> Express</label>' +
    '<p class="mal" id="err"></p><button class="btn f" id="continuar">Continuar al pago</button></section>' +
    '<section id="paso2" hidden><h2>Paso 2 · Pago simulado</h2>' + ["Tarjeta de crédito", "PSE", "Nequi", "PayPal"].map(function (m, i) { return '<label><input type="radio" name="pago" value="' + m + '"' + (i ? "" : " checked") + "> " + m + "</label><br>"; }).join("") +
    '<p><small>Simulación: no ingreses datos de tarjeta ni de cuentas.</small></p><button class="btn f" id="pagar">Pagar (simulado)</button></section></div><aside class="resumen" id="resumen"></aside></div>';
  var $ = function (s) { return document.querySelector(s); };
  function sel() { var pais = $("#pais").value, serv = document.querySelector("input[name=serv]:checked").value; return { pais: pais, serv: serv, tipo: Carrito.tipo(pais), env: Carrito.envio(pais, serv, t.productos) }; }
  function resumen() {
    var s = sel();
    $("#resumen").innerHTML = "<h3>Resumen</h3><p>Productos: " + formatoCOP(t.productos) + (cup ? " (cupón BIENVENIDA10)" : "") + "</p><p>Envío " + s.tipo + " - " + s.serv + ": " + (s.env ? formatoCOP(s.env) : "Gratis") + "</p><p><strong>Total: " + formatoCOP(t.productos + s.env) + "</strong></p>";
  }
  $("#pais").onchange = resumen; document.querySelectorAll("input[name=serv]").forEach(function (r) { r.onchange = resumen; }); resumen();
  enviarEvento("begin_checkout", base());
  $("#continuar").onclick = function () {
    if (!$("#nombre").value.trim()) { $("#err").textContent = "Escribe un nombre ficticio."; return; }
    var s = sel(); $("#err").textContent = "";
    gtag("set", "user_properties", { tipo_cliente: s.tipo });
    enviarEvento("add_shipping_info", Object.assign(base(), { shipping_tier: s.tipo + " - " + s.serv }));
    $("#paso1").hidden = true; $("#paso2").hidden = false;
    document.querySelectorAll("#paso1 input,#paso1 select").forEach(function (e) { e.disabled = true; });
  };
  $("#pagar").onclick = function () {
    var s = sel(), btn = $("#pagar"); btn.disabled = true;
    var pedido = { transaction_id: "PAL-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase(), value: t.productos, shipping: s.env, tipo_cliente: s.tipo, items: Carrito.itemsGA(), enviado: false };
    if (cup) pedido.coupon = Carrito.CODIGO;
    sessionStorage.setItem("paliverde_pedido", JSON.stringify(pedido));
    var p = Object.assign(base(), { payment_type: document.querySelector("input[name=pago]:checked").value });
    Carrito.vaciar(); Carrito.quitarCupon();
    enviarYNavegar("add_payment_info", p, "gracias.html");
  };
})();
