// userCoord used to center map at user coordinates on map initialization
// bcit coord
// var userCoord1 = { lat: 49.20, lng: -123 }
// var userCoord;
var userCoord;
// gets user's position
// function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((geoPos) => {
    userCoord = {
      lat: geoPos.coords.latitude,
      lng: geoPos.coords.longitude,
    };
    // initMap(roomArray);
    getChatroom();
  });
} else {
  // showError(error);
}
// }
// getLocation();

// temp
// function showError(error) {
//   switch(error.code) {
//     case error.PERMISSION_DENIED:
//       x.innerHTML = "User denied the request for Geolocation."
//       break;
//     case error.POSITION_UNAVAILABLE:
//       x.innerHTML = "Location information is unavailable."
//       break;
//     case error.TIMEOUT:
//       x.innerHTML = "The request to get user location timed out."
//       break;
//     case error.UNKNOWN_ERROR:
//       x.innerHTML = "An unknown error occurred."
//       break;
//   }
// }

var roomArray = [];
// gets chatrooms and initializes map with chatroom markers
function getChatroom() {
  db.collection("BC1")
    .get()
    .then((allRooms) => {
      allRooms.forEach((doc) => {
        let roomObj = {
          name: doc.data().name,
          pos: {
            lat: doc.data().lat,
            lng: doc.data().lng,
          },
          // lat: doc.data().lat,
          // lng: doc.data().lng,
        };
        roomArray.push(roomObj);
      });
      // initMap(roomArray);
      window.initMap = initMap(roomArray);
    });
}
// Initialize and add the map
function initMap(roomArray) {
  // centers map on init
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: userCoord,
  });

  var infoWindow = new google.maps.InfoWindow(),
    marker,
    i;

  for (i = 0; i < roomArray.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        roomArray[i].pos.lat,
        roomArray[i].pos.lng
      ),
      icon: "../images/proxychat-marker.svg",
      map: map,
    });

    var infowindow = new google.maps.InfoWindow({
      content: loadContent(roomArray[i].name),
      ariaLabel: roomArray[i].name,
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          infoWindow.setContent(loadContent(roomArray[i].name));
          infoWindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}

//for html to put inside google marker window
function loadContent(roomName) {
  let str = '<div><h5>' + roomName + '</h5><button onclick="joinBtnHandler()"</div>';
  return str;
}



function joinBtnHandler() {
  alert("test");
}

// note: if take this out and only use in .then to get rid of flashing map, but error
// window.initMap = initMap;

//DOM event handlers
// create new chatroom modal
document
  .getElementById("create-button")
  .addEventListener("click", createBtnHandler);

function createBtnHandler(e) {
  let chatName = document.getElementById("create-chat-modal-name").value;
  let room1 = new chatRoom();
  room1.createChatroom(chatName, userCoord.lat, userCoord.lng, "BC1");
}

// Load nav and footer html
/**
 * Maybe change this to not require JQuery and just make our own function to load text
 * temp for now
 */
function loadSkeleton() {
  console.log($("#navbar-container").load("../../text/nav.html"));
  // console.log($('#footer-container').load('../../text/footer.html'));
}
loadSkeleton();
