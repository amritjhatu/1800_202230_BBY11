avatar = "./images/profile-icon.png";         

function loadSkeleton() {
    $("#navbar-container").load("../../text/nav.html");
      // $('#footer-container').load('../../text/footer.html');
    }
    loadSkeleton();

function insertChat(who, text){
    var control = "";
    
    if (who == "me"){
        control = '<li id = "me" style="width:100%; max-width: 700px;">' +
                        '<div class="content msj-rta macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:50%;" src="'+ avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p>username</p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    } else {
        control = '<li id = "other" style="width:100%; max-width: 700px;float: right;">' +
                        '<div class="contentOther msj macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p>username</p>' +
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
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);              
            $(this).val('');
        }
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})

//-- Clear Chat
resetChat();

//-- Print Messages
insertChat("me", "Hello");  
insertChat("you", "Hi");

//-- NOTE: No use time on insertChat.