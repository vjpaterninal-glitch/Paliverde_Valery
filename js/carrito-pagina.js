(function () {
  var app = document.getElementById("app"), mensaje = "";
  function ev(n, p, q) { var it = Carrito.itemGA(p, q, 0, Carrito.cuponActivo()); enviarEvento(n, { value: it.price * q, items: [it] }); }
  function render() {
    var ls = Carrito.lineas(); actualizarContador();
    if (!ls.length) { app.innerHTML = '<h1>Tu carrito</h1><p class="aviso">Tu carrito está vacío. <a href="index.html">Ir al catálogo</a></p>'; return; }
    var cup = Carrito.cuponActivo(), t = Carrito.totales();
    app.innerHTML = "<h1>Tu carrito</h1><table><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>" + ls.map(function (l) {
      var pu = Carrito.itemGA(l.p, l.q, 0, cup).price;
      return "<tr><td>" + l.p.nombre + "</td><td>" + formatoCOP(pu) + '</td><td><button data-acc="menos" data-id="' + l.p.id + '">−</button> ' + l.q + ' <button data-acc="mas" data-id="' + l.p.id + '">+</button></td><td>' + formatoCOP(pu * l.q) + '</td><td><button data-acc="quitar" data-id="' + l.p.id + '">Quitar</button></td></tr>';
    }).join("") + '</table><div class="cupon">' + (cup ? '<span class="ok">Cupón BIENVENIDA10 aplicado (−10 %)</span> <button data-acc="sincupon">Quitar cupón</button>' : '<input id="cod" placeholder="Código de cupón"> <button data-acc="cupon">Aplicar</button>') + ' <span class="mal">' + mensaje + '</span></div><div class="totales"><p>Subtotal: ' + formatoCOP(t.subtotal) + "</p><p>Descuento: −" + formatoCOP(t.descuento) + "</p><p><strong>Productos: " + formatoCOP(t.productos) + '</strong></p><p><small>El envío se calcula en el checkout.</small></p><a class="btn f" href="checkout.html">Ir al checkout</a></div>';
  }
  app.onclick = function (e) {
    var b = e.target.closest("button[data-acc]"); if (!b) return;
    var id = b.dataset.id, a = b.dataset.acc, p = id && buscarProducto(id); mensaje = "";
    if (a === "mas") { Carrito.agregar(id, 1); ev("add_to_cart", p, 1); }
    else if (a === "menos") { Carrito.quitar(id, 1); ev("remove_from_cart", p, 1); }
    else if (a === "quitar") { var q = Carrito.cantidadDe(id); Carrito.quitar(id, q); ev("remove_from_cart", p, q); }
    else if (a === "cupon") { if (!Carrito.aplicarCupon(document.getElementById("cod").value)) mensaje = "Cupón no válido."; }
    else if (a === "sincupon") Carrito.quitarCupon();
    render();
  };
  render();
  if (Carrito.lineas().length) {
    var o = { value: Carrito.totales().productos, items: Carrito.itemsGA() };
    if (Carrito.cuponActivo()) o.coupon = Carrito.CODIGO;
    enviarEvento("view_cart", o);
  }
})();
