import * as firebase from "firebase";

//Add your Firebase Web-apis credentials here
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};


export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
