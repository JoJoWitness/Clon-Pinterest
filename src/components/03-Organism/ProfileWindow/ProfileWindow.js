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
import {collection, query, getDocs, where, getDoc, doc, orderBy, limit} from 'firebase/firestore';


export const ProfileWindow = (props) =>{

  const {currentUser, setSavedPinURI} = props



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
      <Outlet/>
    </div>
  )
}

export const SavedPins = (props) => {

  const [savedPins, setSavedPins] = useState([]);
  // const [savedPinURI, setSavedPinURI] = useState();

  const {currentUser} = props
  

   useEffect(() => {
    console.log(savedPins)
    const fetchPins = async () =>{
    await fetchSavedPins()
    console.log(savedPins)
    }
    fetchPins()
   },[]);


    async function fetchSavedPins(){
      const savedPinQ=[]
      try{

          const savedPinSnapshot = await getDocs(query(collection(db, 'Users', `${currentUser.uid}`, 'Pin Saved' )));           
          savedPinSnapshot.forEach(pin =>{
          const savedPin = pin.data()
          return savedPinQ.push(savedPin)
          })
          return setSavedPins(savedPinQ)

        }
      catch{console.log("Ryuk doesn't want the data")}
    return 
    }    

  


  return(
    <div className="profilePins">
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

  
    </div>
  )
}

export const CreatedPin = (props) => {

  const [createdPins, setCreatedPins] = useState([]);
  // const [savedPinURI, setSavedPinURI] = useState();

  const {currentUser} = props
  

   useEffect(() => {
    const fetchPins = async () =>{
    await fetchCreatedPins()
    }
    fetchPins()
   },[]);


    async function fetchCreatedPins(){
      const savedPinQ=[]
      try{
        console.log(currentUser)
          const createdPinRef = query(collection(db, 'Pin'), where('uid', "==", currentUser.uid))   
          const createdPinSnapshot = await getDocs(createdPinRef)       
          createdPinSnapshot.forEach((pin) =>{
          const createdPin = pin.data()
          return savedPinQ.push(createdPin)} )
          return setCreatedPins(savedPinQ)
          }
         
      catch{console.log("Ryuk doesn't want the data")}
    return 
    }    

  


  return(
    <div className="profilePins">
      {
      (
      createdPins.map(pin => 
        <Link to={`/Pin/${pin.storageUri}`} key={pin.storageUri}>
          <PinPreview
            pin={pin}
          />
        </Link>
        )
      )
      }

  
    </div>
  )
}