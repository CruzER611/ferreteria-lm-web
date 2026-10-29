(function ($) {
  "use strict";

  // ---------------------------------------------------------
  // Menú móvil
  // ---------------------------------------------------------
  $('.menu-toggle > a').on('click', function (e) {
    e.preventDefault();
    $('#responsive-nav').toggleClass('active');
  });

  // ---------------------------------------------------------
  // Carrusel de productos
  // ---------------------------------------------------------
  $('.products-slick').each(function () {
    var $this = $(this),
        $nav = $this.attr('data-nav');

    $this.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
      responsive: [
        { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
      ]
    });
  });

  // Carrusel de productos (widgets pequeños)
  $('.products-widget-slick').each(function () {
    var $this = $(this),
        $nav = $this.attr('data-nav');

    $this.slick({
      infinite: true,
      autoplay: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false
    });
  });

  // ---------------------------------------------------------
  // Página de producto: galería y zoom
  // (solo actúan si esos elementos existen en la página)
  // ---------------------------------------------------------
  $('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs'
  });

  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: 0,
    vertical: true,
    asNavFor: '#product-main-img',
    responsive: [
      { breakpoint: 991, settings: { vertical: false, arrows: false, dots: true } }
    ]
  });

  if (document.getElementById('product-main-img')) {
    $('#product-main-img .product-preview').zoom();
  }

  // ---------------------------------------------------------
  // Filtro de precio (solo existe en la tienda)
  // ---------------------------------------------------------
  var priceInputMax = document.getElementById('price-max'),
      priceInputMin = document.getElementById('price-min'),
      priceSlider = document.getElementById('price-slider');

  function updatePriceSlider(elem, value) {
    // Si la página no tiene el slider, no hacemos nada (evita errores).
    if (!priceSlider || !priceSlider.noUiSlider) { return; }

    if (elem.hasClass('price-min')) {
      priceSlider.noUiSlider.set([value, null]);
    } else if (elem.hasClass('price-max')) {
      priceSlider.noUiSlider.set([null, value]);
    }
  }

  // Selector de cantidad (+ / -)
  $('.input-number').each(function () {
    var $this = $(this),
        $input = $this.find('input[type="number"]'),
        up = $this.find('.qty-up'),
        down = $this.find('.qty-down');

    down.on('click', function () {
      var value = parseInt($input.val(), 10) - 1;
      value = value < 1 ? 1 : value;
      $input.val(value);
      $input.change();
      updatePriceSlider($this, value);
    });

    up.on('click', function () {
      var value = parseInt($input.val(), 10) + 1;
      $input.val(value);
      $input.change();
      updatePriceSlider($this, value);
    });
  });

  // Antes esto daba error en páginas sin filtro de precio (elementos null).
  if (priceInputMax && priceInputMin) {
    priceInputMax.addEventListener('change', function () {
      updatePriceSlider($(this).parent(), this.value);
    });

    priceInputMin.addEventListener('change', function () {
      updatePriceSlider($(this).parent(), this.value);
    });
  }

  if (priceSlider) {
    noUiSlider.create(priceSlider, {
      start: [1, 999],
      connect: true,
      step: 1,
      range: { 'min': 1, 'max': 999 }
    });

    priceSlider.noUiSlider.on('update', function (values, handle) {
      var value = values[handle];

      if (handle) {
        if (priceInputMax) { priceInputMax.value = value; }
      } else {
        if (priceInputMin) { priceInputMin.value = value; }
      }
    });
  }

})(jQuery);
