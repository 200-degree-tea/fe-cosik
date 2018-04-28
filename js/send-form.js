(function() {
  'use strict';

  var SendForm = {
    init: function(options) {
      this.form = options.elem;
      this.url = options.url;
      this.photoSelector = options.photoSelector;

      this.form.addEventListener('submit', this.onFormSubmit.bind(this));
    },

    onFormSubmit: function(event) {
      event.preventDefault();
      var data = new FormData(this.form);

      this.photoSelector.getImages().forEach(function (image){
        data.append('images', image.file);
      });
      this.request(data);
    },

    request: function(data) {
      var xhr = new XMLHttpRequest();

      xhr.open('post', this.url);

      xhr.addEventListener('load', function() {

        if (this.status >= 200 && this.status < 400) {
          console.log(this.responseText);
          alert('Form submited successfully');
        } else{
          alert('Server returned an error', this.status)
        }
      });

      xhr.addEventListener('error', function() {
        alert('Network error.')
      });

      xhr.send(data);
    }
  };

  window.sedona = window.sedona || {};
  window.sedona.SendForm = SendForm;
}());
