import React, { useState, useEffect, Suspense } from "react";
import { BoldTxt } from "../../01-Atoms/Txt/BoldTxt";
import { TxtGrouping } from "../../02-Molecules/Grouping/TxtGrouping";
import { ProfileButtons } from "../../02-Molecules/ButtonsGrouping/ProfileButtons";
import User from '../../../assets/icons/User.svg'
import './ProfileWindow.scss'
import { Outlet } from "react-router-dom";
import { db } from "../../../App";
import { PinPreview } from "../../02-Molecules/ImgPreview/PinPreview";
import { Link } from "react-router-dom";
import {collection, query, getDocs, where, getDoc, doc} from 'firebase/firestore';
import { async } from "@firebase/util";


export const ProfileWindow = (props) =>{

  const {currentUser} = props

  return(
    <div className="ProfileWindow">
      <div className="ProfileInfo">
        <img
          // src={User}
          src={currentUser.photoURL}
        >
        </img>
        <BoldTxt
          // txt='Ryuk the Stray Dog'
          txt={currentUser.displayName}
          />
        <TxtGrouping
          followers='Seguidores'
          followed='Seguidos'
        />
        <ProfileButtons
          txt1='Creados'
          txt2='Guardados'
        />

      </div>
      <SavedPins
        currentUser={currentUser}
      />
    </div>
  )
}

export const SavedPins = (props) => {

  const [savedPins, setSavedPins] = useState([]);
  const {currentUser} = props

  useEffect(() =>{
    const fetchPin = async () =>{
    loadSavedPin().then(pinInfo =>{
    setSavedPins(pinInfo)});
    }
    fetchPin()
    },[]);
  

  

  async function loadSavedPin() { 
    const savedPinQ = [];
    try{
      const pinsURIsnapshot = await getDocs(query(collection(db, "Users", `${currentUser.uid}`, 'Pin Saved')));
      pinsURIsnapshot.forEach(
        async (pin) => { 
        let savedPinURI= pin.data().storageUri
        const savedPinURIsnapshot = await getDocs(query(collection(db, 'Pin'), where("storageUri", "==", savedPinURI)))
        
        return savedPinURIsnapshot.forEach((doc) =>{
          let savedPin = doc.data();
          return savedPinQ.push(savedPin)
        })
      })
    }
      catch{
        console.log("Ryuk doesn't want the data")
      }
      return savedPinQ
    }


  return(
    <div className="profilePins">


      <Suspense fallback={<p>r</p>}>
      {
              (
              savedPins.map(pin => 
                <Link to={`/Pin/${pin.storageUri}`} key={pin.storageUri}>
                  <PinPreview
                    pin={pin}
                  />
                </Link>
                )
              )
              
            }
      </Suspense>

    </div>
  )
}