(function(window) {
  'use-strict';

  var PeopleCounter = Object.create(window.sedona.Counter);

  PeopleCounter.setup = function(options) {
    this.init(options);
    this.template = options.template;
    this.peopleContainer = this.elem.querySelector('.form__inner');
  };

  PeopleCounter.plusButtonHandler = function(index) {
    this.addPerson(index);
  };

  PeopleCounter.minusButtonHandler = function(index) {
    this.removePerson(index);
  }

  PeopleCounter.addPerson = function(index) {
    var person = Mustache.render(this.template, {
      index: index
    });
    this.peopleContainer.insertAdjacentHTML('beforeend', person);
  };

  PeopleCounter.removePerson = function(index) {
    var person = this.elem.querySelector('.person-template-' + (index + 1));
    if (person) {
      this.peopleContainer.removeChild(person);
    }
  };

  window.sedona = window.sedona || {};
  window.sedona.PeopleCounter = PeopleCounter;
}(window));
