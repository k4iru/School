function initMap() {
  var humber = { lat: 43.7291338, lng: -79.6087013 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: humber,
  });
  const marker = new google.maps.Marker({
    position: humber,
    map,
    title: "Click to zoom",
  });

  map.addListener("click", (e) => {
    console.log(e.latLng);
    map.setCenter(e.latLng);
    marker.setPosition(e.latLng);
  });
}
