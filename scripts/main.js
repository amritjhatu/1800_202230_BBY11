// userCoord used to center map at user coordinates on map initialization
// bcit coord
// var userCoord1 = { lat: 49.20, lng: -123 }
// var userCoord;

let userCoord;
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

  // const infoWindow = new google.maps.InfoWindow();
  let marker,
    i;

  for (i = 0; i < roomArray.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        roomArray[i].pos.lat,
        roomArray[i].pos.lng
      ),
      icon: "../images/proxychat-marker.svg",
      map: map,
      name: roomArray[i].name
    });

    // var infowindow = new google.maps.InfoWindow({
    //   content: loadContent(roomArray[i].name),
    //   ariaLabel: roomArray[i].name,
    // });

    // bindInfoWindow(map, marker, infoWindow, roomArray[i].name)

    // google.maps.addEventListener(marker, "click", function(event) {
     

    // })

    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
      $("#join-chat-modal").modal('show');
      document.getElementById("join-chat-modal-chat-name").innerText = 'Chatroom name: ' + marker.name;
      }
      })(marker));
    // google.maps.event.addListener(
    //   marker,
    //   "click",
    //   (function (marker, i) {
    //     return function () {
    //       // infoWindow.setContent('<div><h5>' + roomArray[i].name + '</h5><button id="joinBtn" onclick="console.log(' + roomArray[i].name + ')"></button></div>')
    //       // // infoWindow.setContent(loadContent(roomArray[i].name));
    //       // infoWindow.open(map, marker);
    //       // document.getElementById("joinBtn").addEventListener('click', function () {
    //       //   console.log("test");
    //       // })

    //     }
    //   })(marker, i)
    // );
  }
}

// function bindInfoWindow(map, marker,infoWindow, roomName) {
//   google.maps.event.addListener(
//     marker,
//     "click",
//     function () {
//       console.log(roomName);
//       // infoWindow.setContent('<div><h5>' + roomName + '</h5><button id="joinBtn" onclick="console.log(roomName)"></button></div>')
//       // infoWindow.setContent(loadContent(roomArray[i].name));
//       // infoWindow.open(map, marker);
//       // document.getElementById("joinBtn").addEventListener('click', function () {
//       //   console.log("hi");
//       // })
//     }
//   );
// }

document
  .getElementById("join-button")
  .addEventListener("click", joinBtnHandler);

function joinBtnHandler() {
  console.log("hello");
}


//for html to put inside google marker window
function loadContent(roomName) {
  const str = '<div><h5>' + roomName + '</h5><button id="joinBtn" onclick="console.log(roomName)"></button></div>';
}


// note: if take this out and only use in .then to get rid of flashing map, but error
// window.initMap = initMap;

//DOM event handlers
// create new chatroom modal
document
  .getElementById("create-button")
  .addEventListener("click", createBtnHandler);

function createBtnHandler(e) {
  let chatName = document.getElementById("create-chat-modal-name");
  let room1 = new chatRoom();
  room1.createChatroom(chatName.value, userCoord.lat, userCoord.lng, "BC1");
  chatName.value = '';
}

// Load nav and footer html
/**
 * Maybe change this to not require JQuery and just make our own function to load text
 * temp for now
 */
function loadSkeleton() {
$("#navbar-container").load("../../text/nav.html");
  // $('#footer-container').load('../../text/footer.html');
}
loadSkeleton();
