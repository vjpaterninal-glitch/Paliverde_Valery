(function () {
  var app = document.getElementById("app");
  var LISTA = { item_list_id: "catalogo_principal", item_list_name: "Catálogo principal" };
  function itemsLista() { return PRODUCTOS.map(function (p, i) { return Carrito.itemGA(p, 1, i, false); }); }
  var promo = { promotion_id: "BIENVENIDA10", promotion_name: "Cupón de bienvenida 10%", creative_name: "banner_inicio_bienvenida", creative_slot: "inicio_superior" };
  var mostrar = !Carrito.cuponActivo();
  var h = "";
  if (mostrar) h += '<section class="banner"><div><strong>¡Bienvenido a PALIVERDE!</strong><br>Usa el cupón BIENVENIDA10 y llévate 10 % de descuento.</div><button class="btn a" id="bPromo">Aplicar cupón</button></section>';
  h += "<h1>Catálogo</h1><div class=\"grid\">" + PRODUCTOS.map(function (p) {
    return '<a class="tarjeta" href="producto.html?id=' + p.id + '" data-id="' + p.id + '"><div class="foto" style="background:' + p.color + ";color:" + p.fg + '">' + p.sigla + "</div><h3>" + p.nombre + '</h3><span class="cat">' + p.categoria + "</span><strong>" + formatoCOP(p.precio) + "</strong></a>";
  }).join("") + "</div>";
  app.innerHTML = h;
  enviarEvento("view_item_list", Object.assign({}, LISTA, { items: itemsLista() }));
  if (mostrar) {
    enviarEvento("view_promotion", Object.assign({}, promo, { items: itemsLista() }));
    document.getElementById("bPromo").onclick = function () {
      Carrito.aplicarCupon("BIENVENIDA10");
      enviarYNavegar("select_promotion", Object.assign({}, promo, { items: itemsLista() }), "carrito.html");
    };
  }
  app.querySelectorAll(".tarjeta").forEach(function (a) {
    a.onclick = function (e) {
      e.preventDefault();
      var idx = PRODUCTOS.findIndex(function (p) { return p.id === a.dataset.id; });
      enviarYNavegar("select_item", Object.assign({}, LISTA, { items: [Carrito.itemGA(PRODUCTOS[idx], 1, idx, false)] }), a.getAttribute("href"));
    };
  });
})();
