import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnHYF7n5QEDPolwtUZ55o_9LvfYYeHXTs",
  authDomain: "bloom-chat-14ffe.firebaseapp.com",
  databaseURL: "https://bloom-chat-14ffe-default-rtdb.firebaseio.com/",
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
