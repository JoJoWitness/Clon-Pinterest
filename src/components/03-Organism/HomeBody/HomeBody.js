import React, { useEffect, useState } from "react";
import { PinPreview } from "../../02-Molecules/ImgPreview/PinPreview";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp, QuerySnapshot, getDocs,} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,} from 'firebase/storage';
import { Link } from "react-router-dom";
import './body.scss'
import { db } from "../../../App";
import '../../02-Molecules/ImgPreview/PinPreview.scss'
import '../../01-Atoms/Txt/txt.scss'
import { render } from "react-dom";




export function HomeBody() {
  const [pin, usePin] = useState([]);
  


  useEffect(() =>{
    const fetchPins = async () =>{
    loadPinFYP().then(pinInfo =>{
    usePin(pinInfo)
    });
    }
    fetchPins()
    },[]);
  
   
    async function loadPinFYP() { 
      const pinQ= [];
      try{
      const pinQuery = query(collection(db, 'Pin'), orderBy('timestamp', 'desc'), limit(21));
      const querySnapshot = await getDocs(pinQuery);
      querySnapshot.forEach((doc) => {
        let pinData= doc.data();
            return  pinQ.push(pinData)
      }); 
    }
    catch{
      console.log("Ryuk doesn't have the data")
    }
    return pinQ;
    }

  return(
    <div className="body">

      {
        (
        pin.map(pin => 
          <Link to={`Pin/${pin.storageUri}`} key={pin.storageUri}>
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