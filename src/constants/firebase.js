import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuthObj = getAuth(firebaseApp);
export const firebaseDatabaseObj = getDatabase(firebaseApp);

onAuthStateChanged(firebaseAuthObj, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// const signup = (email, password) => {
//   return auth().createUserWithEmailAndPassword(email, password);
// }

// const signIn = (email, password) => {
//   return auth().signInWithEmailAndPassword(email, password);
// }

// export function logout() {
//   return auth().signOut();
// }
