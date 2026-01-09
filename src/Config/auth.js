import {auth,googleProvider} from "../Config/firebase";
import {signInWithRedirect} from "firebase/auth";

async function signInwithGoogle (){
 try{
  await signInWithRedirect(auth,googleProvider);
 }
 catch(err){
  console.error(err);
 }
}


export default signInwithGoogle;