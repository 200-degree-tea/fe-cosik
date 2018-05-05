(function(window) {
  'use strict';

  window.sedona = window.sedona || {};

  window.sedona.GoogleMaps = {
    init: function(elem){
      this.elem = elem;
    },

    initMap: function() {
      var position = {
        lat: 34.8689738,
        lng: -111.7700938
      };

      var map = new google.maps.Map(this.elem, {
        zoom: 7,
        center: position
      });
      var iconPicture = 'img/icon-map-marker.svg'
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: iconPicture,
        title: 'Sedona'
      });
    },
  }
}(window));
