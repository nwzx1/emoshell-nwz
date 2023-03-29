import { useState } from "react"
import {auth,db} from "../firebase.file/firebase"
import { doc,setDoc,collection,updateDoc,getDoc} from "firebase/firestore"
import { signOut } from "firebase/auth";


export const Logout_user = () => {
        signOut(auth).then(() => {
            console.log("Sign in plz!");
            window.location.reload(true);
          }).catch((err) => {
             console.log(err)
          });
}

export const is_Sign_in = () => {
   let p;
   return p = new Promise((resolve,reject) => {
      auth.onAuthStateChanged((user) =>{
      if (user) {
        resolve(true);
      }
      else {
         reject(false);
      }
    })
   })  

}


