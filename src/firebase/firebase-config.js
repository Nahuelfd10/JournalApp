import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBRMk6rcoE_nMZP2qHwdPnXugP4dSqX-QI",
    authDomain: "react-app-cursos-a24b0.firebaseapp.com",
    projectId: "react-app-cursos-a24b0",
    storageBucket: "react-app-cursos-a24b0.appspot.com",
    messagingSenderId: "305988769219",
    appId: "1:305988769219:web:a65c1b0095617a3469d976"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }