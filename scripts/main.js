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
  db.collection("BC")
    .get()
    .then((allRooms) => {
      allRooms.forEach((doc) => {
        let roomObj = {
          name: doc.data().name,
          pos: {
            lat: doc.data().lat,
            lng: doc.data().lng,
          },
          id: doc.id
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
      name: roomArray[i].name,
      id: roomArray[i].id
    });

    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
      $("#join-chat-modal").modal('show');
      document.getElementById("join-chat-modal-chat-name").innerText = 'Chatroom name: ' + marker.name;
      localStorage.setItem("roomId", marker.id);
      }
      })(marker));
  }
}

//clear create chat modal value
function clearCreateChatName() {
  let chatName = document.getElementById("create-chat-modal-name");
  chatName.value = '';
  // console.log("clearname");
}

//for html to put inside google marker window
function loadContent(roomName) {
  const str = '<div><h5>' + roomName + '</h5><button id="joinBtn" onclick="console.log(roomName)"></button></div>';
}

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
// join modal
document
  .getElementById("join-button")
  .addEventListener("click", joinBtnHandler);

function joinBtnHandler() {
  // console.log(localStorage.getItem("roomId"));
  window.open("chatroom.html", "_self");
}

// Load nav and footer html
function loadSkeleton() {
$("#navbar-container").load("../../text/nav.html");
  // $('#footer-container').load('../../text/footer.html');
}
loadSkeleton();
