let userCoord = {
  lat: 49.249390,
  lng: -123.000770,
};
let loaded = false;
// gets user's position
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function haversineDistance(lat1,lon1,lat2,lon2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  console.log(d);
  return d;
}

function success(pos) {
  const crd = pos.coords;
  userCoord = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
  };
  loaded = true;
  console.log(pos.coords.latitude + " " + pos.coords.longitude);
}

function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.watchPosition(success, error, options);
getChatroom();


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
        haversineDistance(userCoord.lat,userCoord.lng,roomObj.pos.lat,roomObj.pos.lng);
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
      id: roomArray[i].id,
      lat: roomArray[i].pos.lat,
      lng: roomArray[i].pos.lng,
    });

    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
      $("#join-chat-modal").modal('show');
      // console.log(haversineDistance(userCoord.lat,userCoord.lng,marker.position.lat,marker.position.lng));
      if(haversineDistance(userCoord.lat,userCoord.lng,marker.lat,marker.lng) <= 6){
        document.getElementById("join-chat-modal-chat-name").innerText = 'Chatroom name: ' + marker.name;

        document.getElementById("join-button").disabled = false;
      } else{
        document.getElementById("join-chat-modal-chat-name").innerText = 'Chatroom Out of range';

        document.getElementById("join-button").setAttribute("disabled", "");
      }
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
// function loadContent(roomName) {
//   const str = '<div><h5>' + roomName + '</h5><button id="joinBtn" onclick="console.log(roomName)"></button></div>';
// }

//DOM event handlers
// create new chatroom modal
document.getElementById("create-button").addEventListener("click", createBtnHandler);
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
async function test() {
  console.log('start timer');
  await new Promise(resolve => setTimeout(resolve, 1000));
  getChatroom();
}
function createBtnHandler(e) {
  let chatName = document.getElementById("create-chat-modal-name");
  let room1 = new chatRoom();
  let count = 0;
  let str = "chatrooms for this area is full! try joining one that is already active.";
  for(var i = 0; i < roomArray.length; i++){
    if(haversineDistance(userCoord.lat,userCoord.lng,roomArray[i].pos.lat,roomArray[i].pos.lng) <= 6){
      count += 1;
    } 
    if(haversineDistance(userCoord.lat,userCoord.lng,roomArray[i].pos.lat,roomArray[i].pos.lng) <= 0.7){
      count += 6;
      str = "a chatroom already exists at this location!"
    }
  }
  if(count < 6){
    room1.createChatroom(chatName.value, userCoord.lat, userCoord.lng, "BC");
  } else{
    alert(str);
  }
  chatName.value = '';
  test();
}
// join modal
document.getElementById("join-button").addEventListener("click", joinBtnHandler);

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
