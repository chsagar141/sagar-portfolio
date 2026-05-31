import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDd6Uo5QS299OCPdbMT4Vwp_qCS-Y4MPow",
  authDomain: "gen-lang-client-0844027439.firebaseapp.com",
  projectId: "gen-lang-client-0844027439",
  storageBucket: "gen-lang-client-0844027439.firebasestorage.app",
  messagingSenderId: "815918490352",
  appId: "1:815918490352:web:7e258fc24b26ed8a899835"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
