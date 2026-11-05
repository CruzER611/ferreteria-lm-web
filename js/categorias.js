/* =========================================================
   categorias.js  ·  Páginas de categoría
   1) Botones "Cotizar": abren WhatsApp con el mensaje del producto.
   2) Botón "Cargar más": muestra los productos de 8 en 8.
   ========================================================= */
(function () {
  'use strict';

  // ---------------------------------------------------------
  // 1. WhatsApp
  // Un solo "escuchador" para todos los botones. El mensaje se
  // escribe en el HTML, en el atributo data-mensaje del botón.
  // ---------------------------------------------------------
  var TELEFONO = '50363119405';

  document.addEventListener('click', function (e) {
    var boton = e.target.closest('.add-to-cart-btn[data-mensaje]');
    if (!boton) { return; }

    var url = 'https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(boton.dataset.mensaje);
    window.open(url, '_blank', 'noopener');
  });

  // ---------------------------------------------------------
  // 2. Cargar más
  // ---------------------------------------------------------
  var POR_PAGINA = 8; // cuántos productos se muestran cada vez

  var lista = document.getElementById('lista-productos');
  if (!lista) { return; }

  var productos = Array.prototype.slice.call(lista.querySelectorAll('.producto-item'));
  var boton = document.getElementById('btn-cargar-mas');
  var contador = document.getElementById('contador-productos');
  var vacio = document.getElementById('catalogo-vacio');
  var visibles = POR_PAGINA;

  function actualizar() {
    // Antes se usaba prod.style.display, pero el CSS con !important lo ignoraba.
    // Ahora solo ponemos o quitamos la clase "oculto" y el CSS hace el resto.
    productos.forEach(function (producto, indice) {
      producto.classList.toggle('oculto', indice >= visibles);
    });

    var mostrados = Math.min(visibles, productos.length);

    // El botón desaparece cuando ya se muestran todos (o no hay productos).
    if (boton) {
      boton.style.display = visibles >= productos.length ? 'none' : '';
    }

    // "Mostrando 8 de 21 productos" (solo si hay más de una "página")
    if (contador) {
      contador.textContent = productos.length > POR_PAGINA
        ? 'Mostrando ' + mostrados + ' de ' + productos.length + ' productos'
        : '';
    }

    // El aviso de "catálogo vacío" se esconde solo cuando agregues productos.
    if (vacio) {
      vacio.style.display = productos.length ? 'none' : '';
    }
  }

  if (boton) {
    boton.addEventListener('click', function () {
      visibles += POR_PAGINA;
      actualizar();
    });
  }

  actualizar();
})();
