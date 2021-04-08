function initMap() {
  var humber = { lat: 43.7291338, lng: -79.6087013 };
  let map = new google.maps.Map(document.getElementById("map"), {
    center: humber,
    zoom: 8,
  });
  var marker = new google.maps.Marker({ position: humber, map: map });
}
