import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyCvTss1n9iBjx5bkjf-7D_O_zwS6aagOPc",
    authDomain: "yestack1.firebaseapp.com",
    databaseURL: "https://yestack1.firebaseio.com",
    projectId: "yestack1",
    storageBucket: "yestack1.appspot.com",
    messagingSenderId: "867456544767",
    appId: "1:867456544767:web:b4a745371dd0fc923281ca"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
