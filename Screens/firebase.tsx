import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAO_XU_C-tyZientIWGUkcRg6c9mC6v150",
    authDomain: "signal-clone-native-13a5c.firebaseapp.com",
    projectId: "signal-clone-native-13a5c",
    storageBucket: "signal-clone-native-13a5c.appspot.com",
    messagingSenderId: "472952865855",
    appId: "1:472952865855:web:9b671e8037bb06d51ce48a"
};


let app: firebase.app.App

if(firebase.apps.length === 0) app = firebase.initializeApp(firebaseConfig)
else app = firebase.app()

const db = app.firestore()

const auth = firebase.auth()

export { auth, db }