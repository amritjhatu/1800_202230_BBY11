class chatRoom {
    roomId;
    name;
    last;
    lng;

    createChatroom(name,lat,lng){
            this.name = name;
            this.lat = lat;
            this.lng = lng;
    }
    getChatRoom(roomId){
        this.roomId = roomId
        db.collection("Rooms").doc("BC").collection("room1").doc(roomId).get().then(somedoc => {                                                               //arrow notation
            this.name = somedoc.data().name;
            this.lat = somedoc.data().lat;
            this.lng = somedoc.data().lng;
            console.log(this.getName());
            console.log(this.getLat());
            console.log(this.getLng());
        });
    }
    sendMessage(){
    //acess a sub directory in chatroom that contains messages, create new message and upload to database as newest message
    }
    updateMessages(){
    //acess a sub directory in chatroom that contains messages, return all the current mesages in chronological order
    //set a cap on messages to display, as to not cause memory error
    }
    getName(){
        return this.name;
    }
    getLat(){
        return this.lat;
    }
    getLng(){
        return this.lng;
    }
}
// HOW TO CALL A CHAT ROOM WITH KNOW ROOM ID
room  = new chatRoom();
room.getChatRoom("pHBr8gfubDVWKv8GjE6o");


