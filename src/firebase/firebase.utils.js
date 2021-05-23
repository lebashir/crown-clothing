import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAhBaj7Q57NA-yk1zCVDwHO07d0FJhbSdo",
    authDomain: "crown-db-86552.firebaseapp.com",
    projectId: "crown-db-86552",
    storageBucket: "crown-db-86552.appspot.com",
    messagingSenderId: "351736858867",
    appId: "1:351736858867:web:acacc1f52711cd535e4f86"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;