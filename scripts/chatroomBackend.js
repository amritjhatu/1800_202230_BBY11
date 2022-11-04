let chatRoom = {
    name:"", 
    lat:"", 
    lng:"",
    id:"",
    chatRoom:  function(id){
        //this.name = //get from database;
        //this.lat = //get from database;
        //this.lng = //get from database;
    },
    chatRoom:  function(name,lat,lng){
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        createChatroom();
    },
    createChatroom: function (){
    //create chatroom based on current object and upload it to database
    },
    sendMessage: function (){
    //acess a sub directory in chatroom that contains messages, create new message and upload to database as newest message
    },
    updateMessages: function(){
    //acess a sub directory in chatroom that contains messages, return all the current mesages in chronological order
    //set a cap on messages to display, as to not cause memory error
    }
};
console.log();