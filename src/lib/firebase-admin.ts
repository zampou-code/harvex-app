import { getApp, getApps, initializeApp } from "firebase/app";

import { cert } from "firebase-admin/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initFirestore } from "@auth/firebase-adapter";

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const db = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.split(String.raw`\n`).join(
      "\n"
    ),
    // privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});
