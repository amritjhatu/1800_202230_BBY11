## ProxyChat

- [General info](#general-info)
- [Technologies](#technologies)
- [Contents](#content)

## General Info

ProxyChat is location-based chat application. It uses Geolocation API and Google Maps API to render a map UI for our users to navigate and find nearby chat rooms. Backend mostly made with Firebase.

Made by:
- Greg
- Amrit
- Kale

## Technologies

Technologies used for this project:

- HTML, CSS
- JavaScript
- Bootstrap
- JQuery
- Cloud Firestore
- Google Maps API

## Content

Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login page for the application
├── chatroom.html            # chatroom HTML page
├── main.html                # page after you log in
├── profile.html             # profile edit page
├── toFix                    # to do list on what to fix or add soon
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # default image
    /chatbubble.png          # image for chatbubble
    /indexbackground.png     # background image for some screens
    
├── scripts                  # Folder for scripts
    /authentication.js       # authenticator script
    /chatroom.js             # chatroom script
    /chatroombackend         # backend of chatroom script
    /fallimgbubble.js        # falling bubble script intended for landing page
    /firebaseAPI_TEAM11.js.  # firebase connection script
    /main.js                 # main page script with location
    /main2.js                # script for room coordinates
    /profile.js              # script required for profile page
    
├── styles                   # Folder for styles
    /chatroom.css            # css for chatroom
    /index.css               # css for index page
    /login.css               # css for login page
    /main.css                # css for main page to adjust media query
    /map.css                 # css for map to fit screen better
    /nav.css                 # css for navbar 
    /style.css               # free for use in expansion
    
├── text                     # Folder for text
    /footer.html             # footer html if needed to be called
    /nav.html                # navbar html if needed to be called

Firebase hosting files:
├── .firebase
    /hosting..cache
    ./firebase.json
    ./firestore.indexes.json
    ./firestore.rules
    

