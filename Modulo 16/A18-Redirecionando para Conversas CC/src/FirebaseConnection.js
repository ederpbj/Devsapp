import firebase from './node_modules/firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDzYbikmQJuu4S-9hTr69S9-cbyaPcUaEk",
    authDomain: "devsapp-7a3e8.firebaseapp.com",
    databaseURL: "https://devsapp-7a3e8.firebaseio.com",
    projectId: "devsapp-7a3e8",
    storageBucket: "",
    messagingSenderId: "745714495028",
    appId: "1:745714495028:web:214c11164f4ed207"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;