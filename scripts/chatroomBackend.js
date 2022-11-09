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
    async getChatRoom(roomId){
        this.roomId = roomId
        db.collection("Rooms").doc("BC").collection("room1").doc(roomId).onSnapshot(somedoc => {                                                               //arrow notation
            this.name = somedoc.data().name;
            this.lat = somedoc.data().lat;
            this.lng = somedoc.data().lng;
            console.log(this.name);
        });
    }
    sendMessage(){
    //acess a sub directory in chatroom that contains messages, create new message and upload to database as newest message
    }
    async updateMessages() {
        const snapshot = await db.collection("Rooms").doc("BC").collection("room1").doc(this.roomId).collection("messages").onSnapshot();
        return snapshot.docs.map(doc => doc.data());
    }
}
// HOW TO CALL A CHAT ROOM WITH KNOW ROOM ID
room  = new chatRoom();
console.log(room.getChatRoom("pHBr8gfubDVWKv8GjE6o"));



