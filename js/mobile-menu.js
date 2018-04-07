(function() {
  'use strict';

  var MobileMenu = {
    init: function(elem) {
      this.elem = elem;
      this.button = this.elem.querySelector('.main-nav__toggle');
      this.elem.classList.add('main-nav--close');
      this.bindEvents();
    },

    bindEvents: function() {
      this.button.addEventListener('click', this.onButtonClick.bind(this));
    },

    onButtonClick: function(event){
      event.preventDefault();
      this.elem.classList.toggle('main-nav--close');
    }
  }

  var mobileMenuElem = document.querySelector('.main-nav');
  var menu = Object.create(MobileMenu);

  menu.init(mobileMenuElem);
}());
