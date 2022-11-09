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
    async accessChatroom(roomId,province,roomName,func){
        this.roomId = roomId
        this.province = province;
        this.roomName = roomName;

        db.collection("Rooms").doc(province).collection(roomName).doc(roomId).onSnapshot(somedoc =>{
            this.name = somedoc.data().name;
            this.lat = somedoc.data().lat;
            this.lng = somedoc.data().lng;
            return func();
        });
    }
    sendMessage(){
    //acess a sub directory in chatroom that contains messages, create new message and upload to database as newest message
    }
    async updateMessages(roomId,province,roomName,func) {
        var i = 0;
        const snapshot = await db.collection("Rooms").doc(province).collection(roomName).doc(roomId).collection("messages").get()
        snapshot.docs.map(doc =>{ 
            this.messages[i] = doc.data().message
            i++;
        });
        return func();
    }
}
// HOW TO CALL A CHAT ROOM WITH KNOW ROOM ID
room  = new chatRoom();
room.accessChatroom("pHBr8gfubDVWKv8GjE6o","BC","room1",function(){
    console.log(room.name)
    //This is where you can use the chatroom datails
    //assign to your variable or use for whatever
});
room.updateMessages(room.roomId,room.province,room.roomName,function(){
    console.log(room.messages);
});


