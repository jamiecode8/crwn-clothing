import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDT4v2HUR1iDtS5uRn43KGEJwkSzPx3fZk",
  authDomain: "crwn-clothing-db-e33fc.firebaseapp.com",
  projectId: "crwn-clothing-db-e33fc",
  storageBucket: "crwn-clothing-db-e33fc.appspot.com",
  messagingSenderId: "185462007066",
  appId: "1:185462007066:web:4afcfef9677d3de667b8a3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    }catch(error){
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if( !email || !password) return;

  return await createAuthUserWithEmailAndPassword(auth, email, password);

}