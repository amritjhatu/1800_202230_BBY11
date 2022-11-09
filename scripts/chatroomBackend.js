class chatRoom {
    roomId;
    name;
    lat;
    lng;
    messages = [];

    createChatroom(name,lat,lng){
            this.name = name;
            this.lat = lat;
            this.lng = lng;
    }
    async accessChatroom(roomId,province,roomName,getter){
        this.roomId = roomId
        db.collection("Rooms").doc(province).collection(roomName).doc(roomId).onSnapshot(somedoc =>{
            this.name = somedoc.data().name;
            this.lat = somedoc.data().lat;
            this.lng = somedoc.data().lng;
            return getter();
        });
    }
    sendMessage(){
    //acess a sub directory in chatroom that contains messages, create new message and upload to database as newest message
    }
    async updateMessages() {
        db.collection("Rooms").doc("BC").collection("room1").doc(this.roomId).collection("messages").onSnapshot()(somedoc =>{
            console.log(somedoc.data());
        });
    }
}
// HOW TO CALL A CHAT ROOM WITH KNOW ROOM ID
room  = new chatRoom();
room.accessChatroom("pHBr8gfubDVWKv8GjE6o","BC","room1",function(){
    console.log(room.name)
    //This is where you can use the chatroom datails
    //assign to your variable or use for whatever
});
room.updateMessages();


