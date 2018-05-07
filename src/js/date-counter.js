(function(window) {
  'use strict';

  var DateCounter = Object.create(window.sedona.Counter);

  DateCounter.setup = function(options) {

    this.init(options);

    this.checkin = this.elem.querySelector('#checkin');
    this.checkout = this.elem.querySelector('#checkout');

    this.checkin.value = this.getTodaysDate();
    this.updateCheckoutDate();

    this.checkin.addEventListener('change', this.onCheckinDateChange.bind(this));
    this.checkout.addEventListener('change', this.onCheckoutDateChange.bind(this));
  };

  DateCounter.formatDate = function(date) {
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();

    return year + "-" + month.slice(-2) + "-" + day.slice(-2);
  };

  DateCounter.getTodaysDate = function() {
    return this.formatDate(new Date());
  };


  DateCounter.getCheckoutDate = function(checkinValue) {
    var newDate = new Date(checkinValue);
    newDate.setDate(newDate.getDate() + this.counterValue);
    return this.formatDate(newDate);
  };

  DateCounter.getCheckinDate = function(checkoutValue) {
    var newDate = new Date(checkoutValue);
    newDate.setDate(newDate.getDate() - this.counterValue);

    return this.formatDate(newDate);
  };

  DateCounter.updateCheckinDate = function() {
    var newCheckinDate = this.getCheckinDate(this.checkout.value);

    if (/\d{4}-\d{2}-\d{2}/.test(newCheckinDate)) {
      this.checkin.value = (newCheckinDate);
    }
  };

  DateCounter.updateCheckoutDate = function() {
    var newCheckoutDate = this.getCheckoutDate(this.checkin.value);

    if (/\d{4}-\d{2}-\d{2}/.test(newCheckoutDate)) {
      this.checkout.value = newCheckoutDate;
    }
  };

  DateCounter.onCheckinDateChange = function() {
    this.updateCheckoutDate();
  };

  DateCounter.onCheckoutDateChange = function() {
    this.updateCheckinDate();
  };

  DateCounter.plusButtonHandler = function() {
    this.updateCheckoutDate();
  };

  DateCounter.minusButtonHandler = function() {
    this.updateCheckoutDate();
  };

  window.sedona = window.sedona || {};
  window.sedona.DateCounter = DateCounter;
}(window));
