import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    })
  : firebase.app();

export const auth = app.auth();
export const authProviders = {
  google: new firebase.auth.GoogleAuthProvider(),
};

const firestore = app.firestore();
export const db = {
  characters: firestore.collection("characters"),
  // users: firestore.collection("users"),
  // getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

// const analytics = app.analytics();

export default app;