(function(sedona) {
  'use strict';

  // Init menu
  var mobileMenuElem = document.querySelector('.main-nav');

  if (mobileMenuElem) {
    var menu = Object.create(sedona.MobileMenu);
    menu.init(mobileMenuElem);
  }

  // Init day counter
  var dayCounterElems = document.querySelectorAll('.js-counter-days');

  if (dayCounterElems) {
    for (var i = 0; i < dayCounterElems.length; i++) {
      var dateCounter = Object.create(sedona.DateCounter);
      dateCounter.setup({
        elem: dayCounterElems[i],
      });
    }
  }

  //Init people counter
  var peopleCounterElems = document.querySelectorAll('.js-counter-people');
  var template = document.querySelector('#person-template').innerHTML;

  if (peopleCounterElems) {
    for (var i = 0; i < peopleCounterElems.length; i++) {
      var peopleCounter = Object.create(sedona.PeopleCounter);
      peopleCounter.setup({
        elem: peopleCounterElems[i],
        maxValue: 20,
        template: template
      });
    }
  }

}(window.sedona || {}));
