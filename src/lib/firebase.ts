import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Uses Vite environment variables. Add these to your .env (see README note below)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);

let app: any = null;
let _auth: any = null;
let _googleProvider: any = null;
let _db: any = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig as any);
    _auth = getAuth(app);
    _googleProvider = new GoogleAuthProvider();
    _db = getFirestore(app);
  } catch (err) {
    // If initialization fails, log and continue with disabled exports
    // eslint-disable-next-line no-console
    console.error("Firebase initialization error:", err);
  }
} else {
  // eslint-disable-next-line no-console
  console.warn("Firebase not configured — auth and db features are disabled. Add VITE_FIREBASE_* env vars to enable.");
}

export const isFirebaseEnabled = Boolean(_auth && _db);
export const auth = _auth;
export const googleProvider = _googleProvider;
export const db = _db;

// NOTE: create a .env file at project root with keys like:
// VITE_FIREBASE_API_KEY=your_api_key
// VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
// VITE_FIREBASE_PROJECT_ID=your_project_id
// VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
// VITE_FIREBASE_MESSAGING_SENDER_ID=...
// VITE_FIREBASE_APP_ID=1:...:web:...
