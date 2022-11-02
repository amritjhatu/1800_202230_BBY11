// Initialize and add the map
function initMap() {
  // Locations
  /*
   * This section will be populated by: 
   * - user's coordinates for value of center in const map
   * - markers within some proximity of center/user's coordinates
   */
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

// Load nav and footer html
/**
 * Maybe change this to not require JQuery and just make our own function to load text
 * temp for now
 */
function loadSkeleton(){
  console.log($('#navbarPlaceholder').load('../../text/nav.html'));
  console.log($('#footerPlaceholder').load('../../text/footer.html'));
}
loadSkeleton();
