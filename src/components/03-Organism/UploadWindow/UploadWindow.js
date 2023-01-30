import React from "react";
import { useState } from "react";
import { ImgUpload } from "../../01-Atoms/ImgUpload/ImgUpload";
import { TxtUpload } from "../../02-Molecules/txtUpload/TxtUpload";
import './uploadWindow.scss'
import { db } from "../../../App";
import { app } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL,} from 'firebase/storage';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp,} from 'firebase/firestore';
// import { saveImageMessage } from "../../../App";


export const UploadWindow = (props) =>{

  const [pinImg, setPinImg] = useState()
  const [pinTitle, setPinTitle] = useState()
  const [pinDescription, setPinDescription] = useState()


  const {currentUser} = props
  async function savePinText(title, description, file) {
    console.log(currentUser)
   
    try {
     const pinRef = await addDoc(collection(db, "Pin"), {
      title: title,
      description: description,
      file: "",
      timestamp: serverTimestamp(),
      userName: currentUser.displayName,
      uid: currentUser.uid,
      userImg: currentUser.photoURL
    });

    const filePath = `${pinRef.id}`;
    const pinImgRef = ref(getStorage(app), filePath);
    const fileSnapshot = await uploadBytesResumable(pinImgRef, file);
    const publicImageUrl = await getDownloadURL(pinImgRef);

    await updateDoc(pinRef,{
      file: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath
    });

    await setDoc(doc(db, "Users", `${currentUser.uid}`, 'Pin Created', `${fileSnapshot.metadata.fullPath}`),  {
      storageUri: fileSnapshot.metadata.fullPath
    })


  } catch (e) {
    console.error("Error adding document: ", e);
  }

}


  

  return(
    <div className="uploadBody">
      <form className="uploadWindow">
        <ImgUpload
          pinImg={pinImg}
          setPinImg={setPinImg}
        
        />
        <TxtUpload 
          pinTitle={pinTitle}
          setPinTitle={setPinTitle}
          pinDescription={pinDescription}
          setPinDescription={setPinDescription}
        />
        <button type="button" className="uploadPinBtn" onClick={() => savePinText(pinTitle, pinDescription, pinImg)}>Guardar</button>
      </form>
    </div>
  )

}