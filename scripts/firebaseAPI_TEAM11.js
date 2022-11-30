

const firebaseConfig = {
  apiKey: "AIzaSyBehqxEpj49JwDRgRrECJhkBM6ZzvnMPdo",
  authDomain: "bby11-ca505.firebaseapp.com",
  projectId: "bby11-ca505",
  storageBucket: "bby11-ca505.appspot.com",
  messagingSenderId: "570833066983",
  appId: "1:570833066983:web:cd57897e07f430b9c3bb42"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
