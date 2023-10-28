import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAnhT6DJ2OCCeyjkpUXh0_oPKDq899maBs",
    authDomain: "cac23-fb8b7.firebaseapp.com",
    projectId: "cac23-fb8b7",
    storageBucket: "cac23-fb8b7.appspot.com",
    messagingSenderId: "467727935689",
    appId: "1:467727935689:web:2e73e8c4d7d60c39ae0518"
  };


  const app = firebase.initializeApp(firebaseConfig);
  export const auth = app.auth();
  export const firestore = app.firestore();