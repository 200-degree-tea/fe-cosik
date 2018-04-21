(function(window){
  'use-strict';

  var PeopleCounter = Object.create(window.sedona.Counter);

  PeopleCounter.setup = function(options) {
    this.init(options);
  };

  window.sedona = window.sedona || {};
  window.sedona.PeopleCounter = PeopleCounter;
}(window));
