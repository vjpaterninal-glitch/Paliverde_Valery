window.PRODUCTOS = [
  { id: "PAL-001", nombre: "Chips de arracacha original 80 g", categoria: "Snacks", precio: 8500, sigla: "CH", color: "#A6CE39", fg: "#1A1A1A", descripcion: "Chips crujientes de arracacha, fritos y con sal marina. El snack andino de PALIVERDE." },
  { id: "PAL-002", nombre: "Arequipe de arracacha 250 g", categoria: "Dulces", precio: 18000, sigla: "AR", color: "#FFC72C", fg: "#1A1A1A", descripcion: "Arequipe cremoso con base de arracacha, ideal para postres, galletas y pan." },
  { id: "PAL-003", nombre: "Sabajón de arracacha 375 ml", categoria: "Licores", precio: 42000, sigla: "SA", color: "#6B2FA0", fg: "#FFFFFF", descripcion: "Licor cremoso artesanal de arracacha, suave y aromático. Para servir frío o en postres." },
  { id: "PAL-004", nombre: "Cerveza artesanal de arracacha 330 ml", categoria: "Cervezas", precio: 12000, sigla: "CE", color: "#E6007E", fg: "#FFFFFF", descripcion: "Cerveza artesanal rubia elaborada con arracacha, de cuerpo ligero y final dulce." },
  { id: "PAL-005", nombre: "Harina de arracacha 500 g", categoria: "Despensa", precio: 15500, sigla: "HA", color: "#F1F1F1", fg: "#1A1A1A", descripcion: "Harina fina de arracacha, sin gluten, para arepas, panes, coladas y repostería." },
  { id: "PAL-006", nombre: "Cerveza artesanal de arracacha pack x4", categoria: "Cervezas", precio: 44000, sigla: "C4", color: "#1A1A1A", fg: "#A6CE39", descripcion: "Cuatro botellas de 330 ml de nuestra cerveza artesanal de arracacha. Ideal para compartir." },
  { id: "PAL-007", nombre: "Arracacha deshidratada 100 g", categoria: "Despensa", precio: 11000, sigla: "AD", color: "#A6CE39", fg: "#6B2FA0", descripcion: "Láminas de arracacha deshidratada para sopas, cremas o para comer como snack." },
  { id: "PAL-008", nombre: "Sabajón de arracacha 200 ml", categoria: "Licores", precio: 25000, sigla: "S2", color: "#FFC72C", fg: "#6B2FA0", descripcion: "Presentación pequeña de nuestro sabajón de arracacha, perfecta para probarlo." }
];
window.formatoCOP = function (n) { return "$ " + Number(n).toLocaleString("es-CO"); };
window.buscarProducto = function (id) { return window.PRODUCTOS.find(function (p) { return p.id === id; }); };
