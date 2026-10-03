import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAQ-dLh2-_w8Nz9DUC2mOX42WLEvCCZrs8",
  authDomain: "cinemawala-2cd35.firebaseapp.com",
  databaseURL: "https://cinemawala-2cd35-default-rtdb.firebaseio.com",
  projectId: "cinemawala-2cd35",
  storageBucket: "cinemawala-2cd35.firebasestorage.app",
  messagingSenderId: "452417101238",
  appId: "1:452417101238:web:815059909bfa3636c33517",
  measurementId: "G-EY6SGYGBXR"
};

// Initialize Firebase App singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return { success: false, error: error.message, code: error.code };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign-Out Error:', error);
    return { success: false, error: error.message };
  }
};

export { onAuthStateChanged };
export default app;
