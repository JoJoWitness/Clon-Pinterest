import React, {useState, useEffect}  from "react";
import { HomeBody } from "./components/03-Organism/HomeBody/HomeBody";
import { NavBar } from "./components/03-Organism/Navbar/Navbar";
import { UploadWindow } from "./components/03-Organism/UploadWindow/UploadWindow";
import { PinDetails } from "./components/03-Organism/PinDetails/PinDetails";
import { ProfileWindow, SavedPins } from "./components/03-Organism/ProfileWindow/ProfileWindow";
import './main.scss'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { app } from "./firebase-config";
import {getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut,} from 'firebase/auth';
import { Route, Routes, Outlet} from "react-router-dom";;
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp, getDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,} from 'firebase/storage';


export const db = getFirestore(app);
export const storage = getStorage(app);

initializeApp(firebaseConfig)

const App = () => {

  const [createPinWindow, useCreatePinWindow] = useState(false) 

  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    emailVerified:"",
});






const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const imagesRef = ref(storage, 'images');
const spaceRef = ref(storage, 'images/space.jpg');


const signIn = async function signInPopUp() {

  await signInWithPopup(auth, provider)
  const user = auth.currentUser
  await setCurrentUser({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid,
    })
 


};

const signOutUser = function signOutUser() { signOut(auth).then(() => {
  setCurrentUser({
    displayName: "",
    email: "",
    photoURL: "",
    emailVerified: "",
});
}).catch((error) => {
});}

useEffect(()=>{
  const userAuth = async () => {
    const userRef = doc(db, "Users", `${currentUser.email}-${currentUser.uid}`);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists()){
      await updateDoc(userRef,{
        userImg: currentUser.photoURL,
        lastTimeConnected: serverTimestamp(),
      });}
    else{
       setDoc(doc(db, "Users", `${currentUser.uid}`),  {
        lastTimeConnected: serverTimestamp(),
        userName: currentUser.displayName,
        userEmail: currentUser.email,
        userImg: currentUser.photoURL,
        userId: currentUser.uid
    });}}
  userAuth()
}),[currentUser];




  return (
    <>
    <NavBar
      currentUser={currentUser}
      createPinWindow={createPinWindow}
      useCreatePinWindow={useCreatePinWindow}
      signIn={signIn}
      signOut={signOutUser}
    />
    <Routes>
      <Route index element={<HomeBody/>}/>
      <Route path='UploadPin'element={<UploadWindow currentUser={currentUser}/>}/>
      <Route path='Pin/:uri' element={<PinDetails currentUser={currentUser}/>}/>
      <Route path='Profile' element={<ProfileWindow currentUser={currentUser}/>}>
        <Route index element={<SavedPins currentUser={currentUser}/>}/>
        <Route path='Profile/created'/>
      </Route>
    </Routes> 

    

    </>
  )
};

// initializeApp(firebaseAppConfig);




export default App
