import * as firebase from "firebase";
import "@firebase/firestore";
import "@firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDemnK2tN58msfDZ_anW2tmbFgrjcrXUwA",
  authDomain: "cookito-backend.firebaseapp.com",
  projectId: "cookito-backend",
  storageBucket: "cookito-backend.appspot.com",
  messagingSenderId: "952427219556",
  appId: "1:952427219556:web:b8d3ba4dab7e8978adad71",
  measurementId: "G-BJ8PL35NR6",
};
// if user has already opened app atleasonce connect with FIREBASE
if (firebase.apps.length > 0 === false) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
