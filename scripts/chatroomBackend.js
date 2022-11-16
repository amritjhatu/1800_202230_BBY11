class chatRoom {
    roomNumber;
    name;
    lat;
    lng;
    messages = [];

    async createChatroom(roomName,lati,long,province){
        var i = 0;
        const snapshot = await db.collection(province).get()
        snapshot.docs.map(doc =>{
            i++;
            let x = Math.random() * 100;
        });
        db.collection(province).doc("room"+x).set({
            name: roomName,
            lat: lati,
            lng: long
        });
        db.collection(province).doc("room"+x).collection("messages").add({
            userEmail: "proxyChat",
            order: 0,
            message: "Welcome to the chat!"
          })
        
    }
    async accessChatroom(province,roomNumber,func){
        this.province = province;
        this.roomNumber = roomNumber;

        db.collection(province).doc(roomNumber).onSnapshot(somedoc =>{
            this.name = somedoc.data().name;
            this.lat = somedoc.data().lat;
            this.lng = somedoc.data().lng;
            return func();
        });
    }
    async sendMessage(messageContent,email){
        //acess a sub directory in chatroom that contains messages, create new message and upload to database as newest message
        var i = 0;
        const snapshot = await db.collection(this.province).doc(this.roomNumber).collection("messages").get()
        snapshot.docs.map(doc =>{
            i++;
        });
        db.collection(this.province).doc(this.roomNumber).collection("messages").add({
            message: messageContent,
            userEmail: email,
            order: i
        });  
    }
    async updateMessages(func) {
        var i = 0;
        const snapshot = await db.collection(this.province).doc(this.roomNumber).collection("messages").get()
        snapshot.docs.map(doc =>{ 
            this.messages[doc.data().order] = doc.data().message;
            i++;
        });
        return func();
    }
}
// HOW TO CALL A CHAT ROOM WITH KNOW ROOM ID
room  = new chatRoom();
// room.accessChatroom("BC","room1",function(){
//     console.log(room.name)
//     //This is where you can use the chatroom datails
//     //assign to your variable or use for whatever
// });

//USE THIS TO UPDATE MEAGES FROM THE CHAT, WHICH CAN BE ACCESSED WITHIN THE FUNCTION BELOW
// room.updateMessages(function(){
//     console.log(room.messages);
//     //This is where you can use the messages
//     //assign to your variable or use for whatever
// });

//USE THIS TO ADD A MESSAGE TO THE CHAT
//room.sendMessage("i also also came from the client side :D","kaleletendre@gmail.com");

//USE THIS TO CREAT A CHATROOM
// room.createChatroom("SW05",49.24976319428734,-123.00258261514804,"BC");
// room.createChatroom("Metrotown Train",49.225855792181044,-123.00384054081385,"BC");
// room.createChatroom("Timmies",49.25035693390576,-123.00157940196397,"BC");
// room.createChatroom("Gym",49.24877976397611,-123.00091043350153,"BC");

