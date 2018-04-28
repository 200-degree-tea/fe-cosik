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

  if (dayCounterElems.length) {
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

  if (peopleCounterElems.length) {
    for (var i = 0; i < peopleCounterElems.length; i++) {
      var peopleCounter = Object.create(sedona.PeopleCounter);
      peopleCounter.setup({
        elem: peopleCounterElems[i],
        maxValue: 20,
        template: template
      });
    }
  }

  // Init Photo Selector


  // Init Send Form
  var form = document.querySelector('.form');
  if (form && ('FormData' in window)) {
    var photoContainer = document.querySelector('.js-add-photos');
    var template = document.querySelector('#photo-template').innerHTML;

    var photoSelector = Object.create(sedona.PhotoSelector);
    var sendForm = Object.create(sedona.SendForm);

    photoSelector.init({
      elem: photoContainer,
      template: template
    });

    sendForm.init({
      elem: form,
      url: 'https://echo.htmlacademy.ru/adaptive',
      photoSelector: photoSelector
    })
  }



}(window.sedona || {}));
