(function(window) {
  'use strict';

  window.sedona = window.sedona || {};

  window.sedona.Counter = {
    init: function(options) {
      this.elem = options.elem;
      this.initialValue = options.initialValue || 1;
      this.maxValue = options.maxValue || 365;
      this.minValue = options.minValue || 1;
      this.step = options.step || 1;

      this.buttonMinus = this.elem.querySelector('.form__btn--dec');
      this.buttonPlus = this.elem.querySelector('.form__btn--inc');
      this.displayContainer = this.elem.querySelector('.form__number-holder');
      this.counterValue = this.initialValue;
      this.displayContainer.textContent = this.counterValue;

      this.buttonMinus.addEventListener('click', this.onButtonMinusClick.bind(this));
      this.buttonPlus.addEventListener('click', this.onButtonPlusClick.bind(this));
    },

    renderNumber: function() {
      this.displayContainer.textContent = this.counterValue;
    },

    onButtonMinusClick: function() {
      this.counterValue = this.counterValue - 1;
      if (this.counterValue < this.minValue) {
        this.counterValue = this.minValue;
      } else {
        this.renderNumber();
        this.minusButtonHandler(this.counterValue);
      }
    },

    onButtonPlusClick: function() {
      this.counterValue = this.counterValue + 1;
      if (this.counterValue > this.maxValue) {
        this.counterValue = this.maxValue;
      } else {
        this.renderNumber();
        this.plusButtonHandler(this.counterValue);
      }
    },

    plusButtonHandler: function() {},

    minusButtonHandler: function() {},
  }
}(window));
