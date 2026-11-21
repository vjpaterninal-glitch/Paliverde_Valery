# PALIVERDE · Tienda ficticia para laboratorio de GA4

Sitio académico de simulación (Diplomado en E-commerce y Negocios Internacionales Digitales). Solo HTML, CSS y JavaScript: sin servidor, sin base de datos y sin pagos reales. No pide ni guarda correo, teléfono, documento ni datos de tarjeta.

## Qué editar
Solo `js/config.js`: pega tu ID de medición de GA4 (`G-XXXXXXXXXX`) y deja `DEBUG_MODE: true` para ver los eventos en **DebugView**. Con el ID marcador no se carga gtag.js y el monitor muestra un aviso rojo.

## Archivos
`index.html` (catálogo) · `producto.html?id=PAL-001` · `carrito.html` · `checkout.html` · `gracias.html` · `css/estilos.css` · `js/` (config, productos, carrito, analytics, layout/monitor y un .js por página).

## Cupón y envío
- Cupón `BIENVENIDA10`: 10 % de descuento (banner del inicio o campo del carrito).
- Envío (COP): Nacional Estándar 12.000 (gratis desde 150.000 en productos con descuento), Nacional Express 25.000, Internacional Estándar 95.000, Internacional Express 160.000.

## Eventos medidos
view_item_list, view_promotion, select_promotion, select_item, view_item, add_to_cart, remove_from_cart, view_cart, begin_checkout, add_shipping_info (con shipping_tier), add_payment_info (con payment_type) y purchase (con tipo_cliente, una sola vez por pedido). Todos con currency "COP". El monitor de la derecha muestra los últimos 12 eventos, el origen UTM y el botón "Simular nuevo visitante".

Para probar campañas: `https://tu-sitio.vercel.app/?utm_source=facebook&utm_medium=cpc&utm_campaign=lanzamiento`

## Publicar
1. En GitHub: **New repository** > **Add file > Upload files** y sube el contenido de la carpeta (index.html en la raíz) > **Commit**.
2. En Vercel: **Add New > Project**, importa el repositorio, **Framework Preset: Other**, sin comando de build > **Deploy**.
