import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInAnonymously as firebaseSignInAnonymously,
  sendSignInLinkToEmail as firebaseSendEmailLink,
  isSignInWithEmailLink as firebaseIsEmailLink,
  signInWithEmailLink as firebaseSignInWithEmailLink,
  signInWithEmailAndPassword as firebaseSignInWithPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithPassword,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDemoKeyForSalusInitiativeFirebaseSpark',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'salus-initiative.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'salus-initiative',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'salus-initiative.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithPopup,
  firebaseSignOut,
  firebaseSignInAnonymously,
  firebaseSendEmailLink,
  firebaseIsEmailLink,
  firebaseSignInWithEmailLink,
  firebaseSignInWithPassword,
  firebaseCreateUserWithPassword,
};
export type { User };
