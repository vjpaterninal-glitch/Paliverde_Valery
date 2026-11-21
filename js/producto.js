(function () {
  var app = document.getElementById("app"), id = new URLSearchParams(location.search).get("id"), p = buscarProducto(id);
  if (!p) { app.innerHTML = '<p class="aviso">Producto no encontrado. <a href="index.html">Volver al catálogo</a></p>'; return; }
  var adulto = p.categoria === "Licores" || p.categoria === "Cervezas";
  app.innerHTML = '<a href="index.html">← Volver al catálogo</a><div class="detalle"><div class="foto grande" style="background:' + p.color + ";color:" + p.fg + '">' + p.sigla + '</div><div><span class="cat">' + p.categoria + "</span><h1>" + p.nombre + "</h1><p>" + p.descripcion + "</p>" + (adulto ? "<p><small>Venta solo a mayores de 18 años (simulación).</small></p>" : "") + '<p class="precio">' + formatoCOP(p.precio) + '</p><button class="btn f" id="agregar">Agregar al carrito</button> <a class="btn s" href="carrito.html">Ver carrito</a><p id="msg" class="ok"></p></div></div>';
  enviarEvento("view_item", { value: p.precio, items: [Carrito.itemGA(p, 1, 0, false)] });
  document.getElementById("agregar").onclick = function () {
    Carrito.agregar(p.id, 1);
    var it = Carrito.itemGA(p, 1, 0, Carrito.cuponActivo());
    enviarEvento("add_to_cart", { value: it.price * it.quantity, items: [it] });
    actualizarContador();
    document.getElementById("msg").textContent = "Agregado al carrito.";
  };
})();
