import React from "react";
import { SimpleButton } from "../../01-Atoms/SimpleButtons/SimpleButton";
import { PinText } from "../../01-Atoms/Txt/PinText";
import { PinTitle } from "../../01-Atoms/Txt/PinTitle";
import { UserDisplay } from "../../01-Atoms/UserDisplay/UserDisplay";
import { CommentDisplay } from "../../01-Atoms/UserDisplay/UserDisplay";
import { useState, useEffect } from "react";
import { IconButton } from "../../01-Atoms/SimpleButtons/IconButton";
import './PinDetails.scss'
import { TxtInput } from "../../01-Atoms/TxtInput/txtInput";
import cover from '../../../assets/imgs/cover5.jpg'
import arrow from '../../../assets/icons/arrow.svg'
import { db } from "../../../App";
import { getFirestore, collection, addDoc, query, getDoc, getDocs, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp, where} from 'firebase/firestore';





export const PinDetails = (props) => {
  const [pinData, setPinData] = useState([]);
  const [pinComment, setPinComment] = useState();
  const [commentQuery, setCommentQuery] = useState([]);
  const {currentUser} = props

  
  let href = window.location.href
  const hrefArray = href.split("Pin/")
  let storageUri = hrefArray[1]
  

  useEffect(() =>{
    const fetchPin = async () =>{
    await loadPinFYP().then(pinInfo =>{
    setPinData(pinInfo)
    });
    }
    fetchPin()
    const fetchComments = async () =>{
    await loadComments().then(comments => {
    setCommentQuery(comments)
    })  
    }
    fetchComments()
    },[]);
  
  async function loadPinFYP() {
    const pinQuery = []
    try{
      const pinRef = query(collection(db, "Pin"), where("storageUri", "==", storageUri));
      const querySnapshot = await getDocs(pinRef);
      querySnapshot.forEach((doc) => {
      let pin = doc.data();
      pinQuery.push(pin)
    });
      }
  catch{
    console.log("Ryuk doesn't have the data")
  }
  return pinQuery
  }

  async function saveComment(comment) {
   
   console.log('ryu')
    try {
     const pinRef = await addDoc(collection(db, "Pin", storageUri, 'Comments'),  {
      comment: comment,
      timestamp: serverTimestamp(),
      userName: currentUser.displayName,
      uid: currentUser.uid,
      userImg: currentUser.photoURL
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

async function loadComments() { 
  const commentQ= [];
  try{
  const commentQuery = query(collection(db, 'Pin', storageUri, 'Comments'), orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(commentQuery);
  querySnapshot.forEach((doc) => {
    let commentData= doc.data();
        return  commentQ.push(commentData)
  }); 
}
catch{
  console.log("Ryuk doesn't have the data")
}
return commentQ;
}

  const savePin= async () => {
    try{
      const pinRef = await getDoc(doc(db, "Users", `${currentUser.uid}`, 'Pin Saved', `${storageUri}`))
      if (pinRef.exists() || (pinData.uid == currentUser.uid)){
        return console.log("The file is already saved or you're its creator.")
      }
      else{
        console.log('ryu')
        
      await setDoc(doc(db, "Users", `${currentUser.uid}`, 'Pin Saved', `${storageUri}`), {
        storageUri: storageUri
      })

      console.log('ryu otra vez')
    }
  }
  catch{
    console.log("Ryuk doesn't want the data")
  }
}





  return(
  <div className="uploadBody">

    {
      pinData.map(
        pin =>
        <Pin 
          pin={pin}
          pinComment={pinComment}
          setPinComment={setPinComment}
          saveComment={saveComment}
          commentQuery={commentQuery}
          savePin={savePin}
        />
      )
    }

  </div>
  )
}

const Pin = (props) => {
  const {pin, pinComment, setPinComment, saveComment, commentQuery, savePin} = props

  return(

      <div className="pinBody">
        <img className='pinImg' src={pin.file}/>
      <div className="pinText">
        <SimpleButton
          className='colorBtn'
          text='Save'
          fn={savePin}
          />
        <UserDisplay
          userImg={pin.userImg}
          userName={pin.userName}
        />
        <span>
          <PinTitle
            txt={pin.title}
          />
          <PinText
          txt={pin.description}/>
        </span>
          <div className="pinComments">
          {
          commentQuery.map(
            comment =>
            <CommentDisplay 
              comment={comment}
            />
            )
          }
          </div>
        <div className="commentContainer"> 
          <TxtInput id={'ryu'}
          labelTxt='Write a comment'
          className='inputComment'
          maxLength='100'
          state={pinComment}
          setState={setPinComment}
          />
          {
            (pinComment)
            ? <button
                className='iconBtn commentBtn'
                type="submit"
                onClick={() => saveComment(pinComment)}
              >
                <img
                 src={arrow}
                 >
                </img>
              </button>  
            : (null)
          }

        </div>
      </div>
    </div>)
}