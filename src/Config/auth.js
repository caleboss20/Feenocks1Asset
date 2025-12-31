import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getRedirectResult
} from "firebase/auth";
import { auth } from "./firebase";
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const mapUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});
/**
* Google Auth
* @param {boolean} isSignup - true if sign-up, false if sign-in
*/
export const signInWithGoogle = async (isSignup = false) => {
  try {
    if (isMobile()) {
      await signInWithRedirect(auth, googleProvider);
      return { success: true, isSignup };
    } else {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        user: mapUser(result.user),
        isSignup,
      };
    }
  } catch (error) {
    let message = "Failed to sign in with Google";
    if (error.code === "auth/popup-blocked") message = "Popup blocked. Please allow popups.";
    if (error.code === "auth/popup-closed-by-user") message = "Sign-in cancelled";
    return { success: false, error: message };
  }
};
// Mobile redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) return { success: true, user: mapUser(result.user) };
    return null;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? { isAuthenticated: true, user: mapUser(user) } : { isAuthenticated: false, user: null });
  });
};