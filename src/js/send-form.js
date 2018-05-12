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
      var file = this.form.querySelector('.form__input--photos');
      var fileParent = file.parentElement;

      // omits mobile browsers bug on iOS when empty file object is send
      fileParent.removeChild(file);

      var data = new FormData(this.form);
      var images = this.photoSelector.getImages();
      var button = this.form.querySelector('.form__submit');

      if (images.length) {
        images.forEach(function(image) {
          data.append('images', image.file);
        });
      }

      if (!button.disabled) {
        button.disabled = true;
        this.request(data, function() {
          button.disabled = false;
          fileParent.appendChild(file);
        });
      }
    },

    request: function(data, callback) {
      var xhr = new XMLHttpRequest();

      xhr.open('post', this.url);

      xhr.addEventListener('load', function() {

        if (this.status >= 200 && this.status < 400) {
          console.log(this.responseText);
          alert('Form submited successfully');
        } else {
          alert('Server returned an error', this.status)
        }
        callback();
      });

      xhr.addEventListener('error', function() {
        alert('Network error.')
        callback();
      });

      xhr.send(data);
    }
  };

  window.sedona = window.sedona || {};
  window.sedona.SendForm = SendForm;
}());
