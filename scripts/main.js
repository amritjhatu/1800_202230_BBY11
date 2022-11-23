// userCoord used to center map at user coordinates on map initialization
var userCoord = { lat: 49.2490, lng: -123.0019 }

// need array of coord objects in form {lat: num1, lng: num2, name: String}

var room1 = {lat: 49.249, lng: -123.0019} //name: "room1"
var room2 = {lat: 49.250498430619196, lng: -123.01251512262627, name: "Burnaby Hospital"}
var room3 = {lat: 49.25682441069806, lng: -123.00683279574753, name: "Grand Villa Casino Hotel & Conference Centre"}
var roomArray = [room1, room2, room3]

var roomArray1 = []

db.collection("BC1").get().then(allRooms => {
  allRooms.forEach(doc => {
    let roomObj = {
      lat: doc.data().lat,
      lng: doc.data().lng
    }
    roomArray1.push(roomObj);
  })
  initMap(roomArray1);
  window.initMap = initMap;
})


// room  = new chatRoom();
// room.accessChatroom("pHBr8gfubDVWKv8GjE6o","BC","room1",function(){
//     console.log(room.name)
//     //This is where you can use the chatroom datails
//     //assign to your variable or use for whatever
    
//     initMap(room);
// });

// Initialize and add the map
function initMap(roomArray) {
  // Locations
  /*
   * This section will be populated by: 
   * - user's coordinates for value of center in const map
   * - markers within some proximity of center/user's coordinates
   */


  // The map, centered at BCIT for now - change to user's coordinates
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: userCoord,
  });

  // const marker = new google.maps.Marker({
  //   position: {lat: room.lat, lng: room.lng},
  //   map: map
  // })
  
  var marker, i;
  for (i = 0; i < roomArray1.length; i++) {  
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(roomArray1[i].lat, roomArray1[i].lng),
      icon: "../images/proxychat-marker.svg",
      map: map
    });
  }
}

// note: if take this out and only use in .then to get rid of flashing map, but error
// window.initMap = initMap;

// Load nav and footer html
/**
 * Maybe change this to not require JQuery and just make our own function to load text
 * temp for now
 */
function loadSkeleton(){
  // console.log($('#navbar-container').load('../../text/nav.html'));
  // console.log($('#footer-container').load('../../text/footer.html'));
}
loadSkeleton();
