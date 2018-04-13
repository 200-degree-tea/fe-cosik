(function(){
  'use strict';

  var Counter = {
    init: function(options){
      this.elem = options.elem;
      this.initialValue = options.initialValue || 1;
      this.maxValue = options.maxValue || 365;
      this.minValue = options.minValue || 1;
      this.step = options.step || 1;

      this.buttonMinus = this.elem.querySelector('.form__btn--dec');
      this.buttonPlus = this.elem.querySelector('.form__btn--inc');
      this.displayContainer = this.elem.querySelector('.form__number-holder');

      this.buttonMinus.addEventListener('click', this.onButtonMinusClick.bind(this));
      this.buttonPlus.addEventListener('click', this.onButtonPlusClick.bind(this));

    },

    onButtonMinusClick() {
      console.log("minus");
    },

    onButtonPlusClick() {
      console.log("plus");
    }
  }

  var dayCounterElem = document.querySelector('.js-counter-days');
  var counter = Object.create(Counter);

  counter.init({
    elem: dayCounterElem,
  });
}());
