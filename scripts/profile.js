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
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCountry = userDoc.data().country;
                    let userPicture = userDoc.data().picture;

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
                        document.getElementById("mypic-goes-here").value = userPicture;
                        console.log(userPicture);
                        $("#mypic-goes-here").attr("src", userPicture);
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
 

  currentUser.update({
    name: userName,
    school: userSchool,
    country: userCountry,
  
})
.then(() => {
    console.log("Document successfully updated!");
})
    document.getElementById('personalInfoFields').disabled = true;
}

var ImageFile;      //global variable to store the File Object reference

function save_image() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.email);
            console.log(user.displayName);
            email = user.email;

            db.collection("users").doc(user.email)
            .set({
                picture: ""
            },{merge: true});

        } else {
            // No user is signed in.
        }
    });

    }

     

function showUploadedPicture(){
    const fileInput = document.getElementById("pictureInput");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function(e){

        //the change event returns a file "e.target.files[0]"
        var blob = URL.createObjectURL(e.target.files[0]);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
showUploadedPicture();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // Do something for the user here. 
  } else {
    // No user is signed in.
  }
});



function uploadProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("pictureInput");   // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;            // display this image

            //store using this name
            var storageRef = storage.ref("images/" + user.email + ".jpg"); 
           
					  storageRef.put(file)
				    .then(function(){
							 console.log('Uploaded to Cloud Storage.');
						   storageRef.getDownloadURL()
					     .then(function (url) { // Get URL of the uploaded file
				           console.log("Got the download URL.");
				           db.collection("users").doc(user.email).update({
				               "picture": url  // Save the URL into users collection
				           })
                   .then(function(){
                        console.log('Added Profile Pic URL to Firestore.');
                   })
					      })
					  })
        })
    })
}
uploadProfilePic();


function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (user) {      //get user object
        db.collection("users").doc(user.email)                  //use user's email
            .get()                                            //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic;           //extract pic url

								// use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                
								// use this line if "mypic-goes-here" is an "img" 
								$("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();



