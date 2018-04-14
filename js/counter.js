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
      this.counterValue = +this.displayContainer.textContent || 1;

      this.buttonMinus.addEventListener('click', this.onButtonMinusClick.bind(this));
      this.buttonPlus.addEventListener('click', this.onButtonPlusClick.bind(this));

      //Date counter
      this.checkin = this.elem.querySelector('#checkin');
      this.checkout = this.elem.querySelector('#checkout');

      this.checkin.value = this.getTodaysDate();
      this.updateCheckoutDate();

      this.checkin.addEventListener('change', this.onCheckinDateChange.bind(this));
      this.checkout.addEventListener('change', this.onCheckoutDateChange.bind(this));

    },

    renderNumber: function() {
      this.displayContainer.textContent = this.counterValue;
    },

    onButtonMinusClick: function() {
      this.counterValue = this.counterValue - 1;
      if(this.counterValue <= this.minValue) {
        this.counterValue = 1;
      }
      this.renderNumber();
      this.updateCheckoutDate();
    },

    onButtonPlusClick: function() {
      this.counterValue = this.counterValue + 1;
      if(this.counterValue > this.maxValue) {
        this.counterValue = 365;
      }
      this.renderNumber();
      this.updateCheckoutDate();
    },

    formatDate: function(date) {
      var year = date.getFullYear();
      var month = "0" + (date.getMonth() + 1);
      var day = "0" + date.getDate();

      return year + "-" + month.slice(-2) + "-" + day.slice(-2);
    },

    getTodaysDate: function() {
      return this.formatDate(new Date());
    },

    getCheckoutDate: function(){
      var newDate = new Date(this.checkin.value);
      newDate.setDate(newDate.getDate() + this.counterValue);

      return this.formatDate(newDate);
    },

    getCheckinDate: function() {
      var newDate = new Date(this.checkout.value);
      newDate.setDate(newDate.getDate() - this.counterValue);

      return this.formatDate(newDate);
    },

    updateCheckinDate: function() {
      this.checkin.value = this.getCheckinDate();
    },

    updateCheckoutDate: function() {
      this.checkout.value = this.getCheckoutDate();
    },

    onCheckinDateChange: function() {
      this.updateCheckoutDate();
    },

    onCheckoutDateChange: function() {
      this.updateCheckinDate();
    }
  }

  var dayCounterElems = document.querySelectorAll('.js-counter-days');

  for( var i = 0; i < dayCounterElems.length; i++ ) {
    var counter = Object.create(Counter);
    counter.init({
      elem: dayCounterElems[i],
    });
  }
}());
