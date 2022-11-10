// let coord1 = {};
// // room1 = new chatRoom();
// room.accessChatroom("pHBr8gfubDVWKv8GjE6o","BC","room1",function(){
//     console.log(room.name)
//     //This is where you can use the chatroom datails
//     //assign to your variable or use for whatever
//     var coord1 = {lat: room.lat, lng: room.lng}
//     coord1.lat = room.lat;
//     coord1.lng = room.lng;
//     console.log(coord1);
//     initMap(coord1);
// });
// room = new chatRoom();
// room.accessChatroom

// userCoord used to center map at user coordinates on map initialization
var userCoord = { lat: 49.2490, lng: -123.0019 }

// need array of coord objects in form {lat: num1, lng: num2, name: String}

var room1 = {lat: 49.249, lng: -123.0019} //name: "room1"
var room2 = {lat: 49.250498430619196, lng: -123.01251512262627, name: "Burnaby Hospital"}
var room3 = {lat: 49.25682441069806, lng: -123.00683279574753, name: "Grand Villa Casino Hotel & Conference Centre"}
var roomArray = [room1, room2, room3]

var roomArray1 = []

// db.collection("Rooms").doc("BC").collection("room").doc("pHBr8gfubDVWKv8GjE6o").get().then((doc) => {
//   // let docObject = {
//   //   lat: doc
//   // }
//   console.log(doc.data());
//   });

// room  = new chatRoom();
room.accessChatroom("pHBr8gfubDVWKv8GjE6o","BC","room1",function(){
    console.log(room.name);
    let roomObj = {
      lat: room.lat,
      lng: room.lng,
      name: room.name
    }
    console.log(roomObj);
    roomArray1.push(roomObj);
    //This is where you can use the chatroom datails
    //assign to your variable or use for whatever
});
console.log(roomArray1);

// db.collection("Rooms").doc("BC").collection("room1").doc(this.roomId).collection("messages").onSnapshot()(somedoc =>{
//   console.log(somedoc.data());
// });

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
    center: userCoord,
  });
  
  var marker, i;
  for (i = 0; i < roomArray.length; i++) {  
      marker = new google.maps.Marker({
      position: new google.maps.LatLng(roomArray[i].lat, roomArray[i].lng),
      map: map
    });
  }
}

window.initMap = initMap;

// Load nav and footer html
/**
 * Maybe change this to not require JQuery and just make our own function to load text
 * temp for now
 */
function loadSkeleton(){
  console.log($('#navbar-container').load('../../text/nav.html'));
  // console.log($('#footer-container').load('../../text/footer.html'));
}
loadSkeleton();
