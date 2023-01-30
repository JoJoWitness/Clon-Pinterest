import React from "react";
import { SimpleButton} from "../../01-Atoms/SimpleButtons/SimpleButton";
import './ButtonsGrouping.scss'
import { Link } from "react-router-dom";

export function FeedButtons(){
  return(
    <div className="feedBtns">
      <Link to="/">
        <SimpleButton
        text='Home'
        className='feedBtn'/>
      </Link>
      <Link to="UploadPin">
        <SimpleButton
        className='feedBtn'
        text='Create'/>
      </Link>
    </div>
  )
}