import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "./firebase";
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
const isMobile = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
export const signInWithGoogle = async () => {
  if (isMobile()) {
    // mobile-safe
    await signInWithRedirect(auth, provider);
    return null;
  } else {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  }
};
export const handleGoogleRedirect = async () => {
  const result = await getRedirectResult(auth);
  if (result) {
    return result.user;
  }
  return null;
};