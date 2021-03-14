import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDIx4sRY40aT8iylqQ3Jr-M9SQFfXmRbKQ",
    authDomain: "bt3103-week-6-7ee1b.firebaseapp.com",
    projectId: "bt3103-week-6-7ee1b",
    storageBucket: "bt3103-week-6-7ee1b.appspot.com",
    messagingSenderId: "682310497859",
    appId: "1:682310497859:web:032b65c114b837317c06f6",
    measurementId: "G-YKFZD2EPGT"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;