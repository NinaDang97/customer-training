import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7nz5nNWFK488ViIOl2XJMff3E3xKzzeg",
    authDomain: "my-project-1497126186658.firebaseapp.com",
    databaseURL: "https://my-project-1497126186658.firebaseio.com",
    projectId: "my-project-1497126186658",
    storageBucket: "my-project-1497126186658.appspot.com",
    messagingSenderId: "912038265317"
  };

if(!firebase.apps.length){
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };