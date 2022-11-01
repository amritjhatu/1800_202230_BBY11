// Initialize and add the map
function initMap() {
  // The location of BCIT
  const bcit = { lat: 49.2490, lng: -123.0019 };
  // The map, centered at BCIT for now - change to user's coordinates
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: bcit,
  });
  // The marker, positioned at BCIT - change later
  const marker = new google.maps.Marker({
    position: bcit,
    map: map,
  });
}

window.initMap = initMap;

function loadSkeleton(){
  console.log($('#navbarPlaceholder').load('../../text/nav.html'));
  console.log($('#footerPlaceholder').load('../../text/footer.html'));
}
loadSkeleton();  //invoke the function
