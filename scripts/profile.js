var currentUser          //put this right after you start script tag before writing any functions.

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.email)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().school;
                    var userCountry = userDoc.data().country;
                    var userPicture = userDoc.data().picture;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                    if (userPicture != null) {
                        document.getElementById("pictureInput").value = userPicture;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

 function saveUserInfo() {
  var  userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
  var  userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
  var  userCountry = document.getElementById('countryInput').value;       //get the value of the field with id="countryInput"
  var  userPicture = document.getElementById('pictureInput').value;

  currentUser.update({
    name: userName,
    school: userSchool,
    country: userCountry,
    picture: userPicture
})
.then(() => {
    console.log("Document successfully updated!");
})
    document.getElementById('personalInfoFields').disabled = true;
}

var ImageFile;      //global variable to store the File Object reference

function chooseFileListener(){
    const fileInput = document.getElementById("pictureInput");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function(e){

        //the change event returns a file "e.target.files[0]"
	      ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.email + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
												//get values from the from
                        userName = document.getElementById('nameInput').value;
                        userSchool = document.getElementById('schoolInput').value;
                        userCountry = document.getElementById('countryInput').value;

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.email).update({
                                name: userName,
                                school: userSchool,
                                country: userCountry,
                                picture: url // Save the URL into users collection
                            })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}
uploadUserProfilePic();

function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (user) {      //get user object
        db.collection("users").doc(user.email)                  //use user's uid
            .get()                                            //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().picture;           //extract pic url

								// use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                
								// use this line if "mypic-goes-here" is an "img" 
								$("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();




