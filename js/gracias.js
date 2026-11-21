(function () {
  var app = document.getElementById("app"), raw = sessionStorage.getItem("paliverde_pedido"), ped = null;
  try { ped = raw && JSON.parse(raw); } catch (e) {}
  if (!ped) { app.innerHTML = '<h1>Gracias</h1><p class="aviso">No hay un pedido reciente. <a href="index.html">Ir al catálogo</a></p>'; return; }
  var nota = "";
  if (!ped.enviado) {
    gtag("set", "user_properties", { tipo_cliente: ped.tipo_cliente });
    var o = { transaction_id: ped.transaction_id, affiliation: "PALIVERDE Tienda Online", value: ped.value, shipping: ped.shipping, tipo_cliente: ped.tipo_cliente, items: ped.items };
    if (ped.coupon) o.coupon = ped.coupon;
    enviarEvento("purchase", o);
    ped.enviado = true; sessionStorage.setItem("paliverde_pedido", JSON.stringify(ped));
  } else nota = '<p class="aviso">Este pedido ya fue registrado: recargar la página no repite el evento purchase.</p>';
  app.innerHTML = "<h1>¡Gracias por tu compra simulada!</h1><p>Pedido <strong>" + ped.transaction_id + "</strong> · Cliente " + ped.tipo_cliente + "</p><p>Productos: " + formatoCOP(ped.value) + " · Envío: " + (ped.shipping ? formatoCOP(ped.shipping) : "Gratis") + " · <strong>Total: " + formatoCOP(ped.value + ped.shipping) + "</strong></p>" + nota + '<a class="btn f" href="index.html">Seguir comprando</a>';
  actualizarContador();
})();
