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

export const createUserProfileDocument = async (userAuth, additionData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()
  if(!snapShot.exists) {
    const { displayName , email } = userAuth; 
    const createdAt = new Date(); 
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      })
    }catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
  
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(
    doc => {
      const { title, items } = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    }
  );
  return transformedCollection.reduce( (accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;