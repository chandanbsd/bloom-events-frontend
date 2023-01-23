import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuthObj = getAuth(firebaseApp);
export const firebaseDatabaseObj = getDatabase(firebaseApp);

onAuthStateChanged(firebaseAuthObj, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
  }
});
