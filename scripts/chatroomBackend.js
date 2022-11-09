class chatRoom {
    roomId;
    name;
    lat;
    lng;

    createChatroom(name,lat,lng){
            this.name = name;
            this.lat = lat;
            this.lng = lng;
    }
    async accessChatroom(roomId,){
        this.roomId = roomId
        db.collection("Rooms").doc("BC").collection("room1").doc(roomId).onSnapshot(somedoc =>{
            this.name = somedoc.data().name;
            this.lat = somedoc.data().lat;
            this.lng = somedoc.data().lng;
            this.getName();
        });
    }
    getName(){
        console.log(this.name);
        return this.name;
    }
    getLat(){
        return this.lat;
    }
    getLng(){
        return this.lng;
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
room.accessChatroom("pHBr8gfubDVWKv8GjE6o");


