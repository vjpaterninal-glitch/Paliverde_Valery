(function () {
  var K = "paliverde_carrito", KC = "paliverde_cupon", COD = "BIENVENIDA10", PCT = 0.10;
  function leer() { try { return JSON.parse(localStorage.getItem(K)) || {}; } catch (e) { return {}; } }
  function guardar(c) { localStorage.setItem(K, JSON.stringify(c)); }
  var C = {
    CODIGO: COD,
    cuponActivo: function () { return localStorage.getItem(KC) === COD; },
    aplicarCupon: function (c) { if (String(c).trim().toUpperCase() === COD) { localStorage.setItem(KC, COD); return true; } return false; },
    quitarCupon: function () { localStorage.removeItem(KC); },
    cantidadDe: function (id) { return leer()[id] || 0; },
    cantidadTotal: function () { var c = leer(), t = 0; for (var k in c) t += c[k]; return t; },
    agregar: function (id, n) { var c = leer(); c[id] = (c[id] || 0) + n; guardar(c); },
    quitar: function (id, n) { var c = leer(); c[id] = (c[id] || 0) - n; if (c[id] <= 0) delete c[id]; guardar(c); },
    vaciar: function () { localStorage.removeItem(K); },
    // Ítem con el formato del contrato de medición. Con cupón: price con descuento, discount por unidad y coupon.
    itemGA: function (p, q, i, cup) {
      var it = { item_id: p.id, item_name: p.nombre, item_brand: "PALIVERDE", item_category: p.categoria, price: p.precio, quantity: q, index: i };
      if (cup) { var pd = Math.round(p.precio * (1 - PCT)); it.price = pd; it.discount = p.precio - pd; it.coupon = COD; }
      return it;
    },
    lineas: function () { var c = leer(); return window.PRODUCTOS.filter(function (p) { return c[p.id]; }).map(function (p) { return { p: p, q: c[p.id] }; }); },
    itemsGA: function () { var cup = C.cuponActivo(); return C.lineas().map(function (l, i) { return C.itemGA(l.p, l.q, i, cup); }); },
    totales: function () {
      var sub = 0, pro = 0, cup = C.cuponActivo();
      C.lineas().forEach(function (l) { sub += l.p.precio * l.q; pro += C.itemGA(l.p, l.q, 0, cup).price * l.q; });
      return { subtotal: sub, descuento: sub - pro, productos: pro };
    },
    tipo: function (pais) { return pais === "Colombia" ? "Nacional" : "Internacional"; },
    // Envío gratis (Nacional Estándar) desde $150.000 en productos (ya con descuento).
    envio: function (pais, serv, productos) {
      if (pais === "Colombia") return serv === "Estándar" ? (productos >= 150000 ? 0 : 12000) : 25000;
      return serv === "Estándar" ? 95000 : 160000;
    }
  };
  window.Carrito = C;
})();
