var imgHolder = area.querySelector('.form__display-photos');

area.querySelector(".form__input--hidden").addEventListener("change", function() {
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
    preview(files[i]);
  }
});

function preview(file) {
  if (file.type.match(/image.*/)) {
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var photo = Mustache.render(template, {
        file: event.target.result
      });
      imgHolder.insertAdjacentHTML('beforeend', photo);
    });
    reader.readAsDataURL(file);
  }
}
/*
1 - wyselekcjonowac parent parent container -> input and displayPhotos
2 - wyselekcjonowac template
3 - przekazujemy template and area
4 - ustawic addEventListener jak zdjecia dodawane do input dodajemy do strony preview dodahemy photo so kolejki
5 - usuniecie zdjecia po kliknieciu na Remove
6 -
*/
