(function(window) {
  'use strict';

  var PhotoSelector = {
    init: function(options) {
      this.elem = options.elem;
      this.template = options.template;
      this.previewContainer = this.elem.querySelector('.form__display-photos');
      this.fileInput = this.elem.querySelector('.form__input--photos');
      this.fileInput.addEventListener('change', this.onInputChange.bind(this));
      this.queue = [];

      this.removeButton = this.elem.querySelector('.form__remove-btn');
    },

    getImages: function() {
      return this.queue;
    },

    onInputChange: function() {
      var files = this.fileInput.files;

      for (var i = 0; i < files.length; i++) {
        this.preview(files[i]);
      }

      this.fileInput.value = '';
    },

    preview: function(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();

        reader.addEventListener('load', function(event) {
          this.onFileLoad(event, file);
        }.bind(this));

        reader.readAsDataURL(file);
      }
    },

    removePreview: function(previewImage) {
      this.queue = this.queue.filter(function(element) {
        return element.previewImage != previewImage;
      });
      previewImage.parentNode.removeChild(previewImage);
    },

    onFileLoad: function(event, file) {
      var photo = Mustache.render(this.template, {
        file: event.target.result
      });
      var previewImage = document.createElement('div');
      previewImage.classList.add('form__grid-item');
      previewImage.innerHTML = photo;
      this.previewContainer.appendChild(previewImage);

      previewImage.querySelector('.form__remove-btn').addEventListener('click', function(event) {
        event.preventDefault();
        this.removePreview(previewImage);
      }.bind(this));

      this.queue.push({
        file: file,
        previewImage: previewImage
      });
    }
  };

  window.sedona = window.sedona || {};
  window.sedona.PhotoSelector = PhotoSelector;
}(window));
