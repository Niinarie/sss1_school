// Init map in modal with cat's coordinates
export function initMap(coords) {
  const map = new google.maps.Map(document.getElementById('mapContainer'), {
    zoom: 9,
    center: coords,
  });
  const marker = new google.maps.Marker({
    position: coords,
    map: map,
  });
}

// Init map on add cat -page
export function initAddMap() {
  const coords = { lat: 60.220622, lng: 24.802490 };
  const latField = document.getElementById('lat');
  const lngField = document.getElementById('lng');
  latField.value = coords.lat;
  lngField.value = coords.lng;

  const map = new google.maps.Map(document.getElementById('mapCoords'), {
    zoom: 8,
    center: coords,
  });
  let updateTimeout = null;

  const marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: 'Cat location',
  });

  google.maps.event.addListener(map, 'click', (event) => {
    updateTimeout = setTimeout(() => {
      console.log('click');
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      latField.value = lat;
      lngField.value = lng;

      marker.setPosition({ lat, lng });
    }, 200);
  });

  google.maps.event.addListener(map, 'dblclick', (event) => {
    clearTimeout(updateTimeout);
  });
}

// init update form's map with existing coordinates
export function initUpdateMap(coords) {
  const latField = document.getElementById('lat');
  const lngField = document.getElementById('lng');
  latField.value = coords.lat;
  lngField.value = coords.lng;

  const map = new google.maps.Map(document.getElementById('mapUpdate'), {
    zoom: 8,
    center: coords,
  });
  let updateTimeout = null;

  const marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: 'Cat location',
  });

  google.maps.event.addListener(map, 'click', (event) => {
    updateTimeout = setTimeout(() => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      latField.value = lat;
      lngField.value = lng;

      marker.setPosition({ lat, lng });
    }, 200);
  });

  google.maps.event.addListener(map, 'dblclick', (event) => {
    clearTimeout(updateTimeout);
  });
}
