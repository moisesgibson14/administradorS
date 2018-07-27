import firebase from 'firebase'

var dbDos = firebase.initializeApp({
    apiKey: "AIzaSyDI9X2HLKKlPNQdZrPI0SaG6bH9rEba0qM",
    authDomain: "tes2-b3b70.firebaseapp.com",
    databaseURL: "https://tes2-b3b70.firebaseio.com",
    projectId: "tes2-b3b70",
    storageBucket: "tes2-b3b70.appspot.com",
    messagingSenderId: "580388810886"
}, 'secundary');

export default dbDos;