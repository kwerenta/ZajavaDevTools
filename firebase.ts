import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  getFirestore,
  collection,
  DocumentData,
} from "firebase/firestore/lite";

const app = !getApps().length
  ? initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    })
  : getApp();

export const auth = getAuth(app);

export const firestore = getFirestore(app);
export const db = {
  characters: collection(firestore, "characters"),
  quests: (uid: string) => collection(firestore, `characters/${uid}/quests/`),
  formatDoc: <Type>(doc: DocumentData): Type => ({
    ...doc.data(),
    uid: doc.id,
  }),
};
