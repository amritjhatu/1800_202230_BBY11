avatar = "./images/profile-icon.png";     
var roomId = localStorage.getItem('roomId');
console.log(roomId);  
var email;
firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
        email = user.email;
    }
});
room  = new chatRoom();
room.accessChatroom("BC",roomId,function(){
    console.log(room.name)
});

function loadSkeleton() {
    $("#navbar-container").load("../../text/nav.html");
      // $('#footer-container').load('../../text/footer.html');
    }
    loadSkeleton();

function insertChat(who, text){
    var control = "";
    if (who == email){
        control = '<li id = "me" style="width:100%; max-width: 700px;">' +
                        '<div class="content msj-rta macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:50%;" src="'+ avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p id = "text">'+ text +'</p>' +
                                '<p id = "username">'+ who + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    } else {
        control = '<li id = "other" style="width:100%; max-width: 700px;float: right;">' +
                        '<div class="contentOther msj macro">' +
                            '<div class="text text-r">' +
                                '<p id = "text">'+text+'</p>' +
                                '<p id = "username">'+ who + '</p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:50%;" src="'+ avatar +'" /></div>' +                                
                  '</li>';
    }
    $("#messages").append(control).scrollTop($("#messages").prop('scrollHeight'));
}

function resetChat(){
    $("#messages").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){ //on enter fun this
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);
            room.sendMessage(text,email);
              
            $(this).val('');
        }
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})

room.updateMessages(function(){
    console.log(room.messages);
    console.log(room.users);
    var i = 0;
    resetChat();
    room.messages.forEach(element => {
        insertChat(room.users[i],element);
        i++;
    });
});

var intervalId = window.setInterval(function(){
    room.updateMessages(function(){
        console.log(room.messages);
        console.log(room.users);
        var i = 0;
        resetChat();
        room.messages.forEach(element => {
            insertChat(room.users[i],element);
            i++;
        });
    });
}, 1000);

//-- NOTE: No use time on insertChat.