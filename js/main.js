(function(sedona) {
  'use strict';

// Init menu
  var mobileMenuElem = document.querySelector('.main-nav');

  if(mobileMenuElem) {
    var menu = Object.create(sedona.MobileMenu);
    menu.init(mobileMenuElem);
  }

// Init counter
  var dayCounterElems = document.querySelectorAll('.js-counter-days');

  if(dayCounterElems){
    for( var i = 0; i < dayCounterElems.length; i++ ) {
      var dateCounter = Object.create(sedona.DateCounter);
      dateCounter.setup({
        elem: dayCounterElems[i],
      });
    }
  }
}(window.sedona || {}));
