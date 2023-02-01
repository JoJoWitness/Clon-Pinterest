import React from "react";
import { Link } from "react-router-dom";
import { SimpleButton } from "../../01-Atoms/SimpleButtons/SimpleButton";
import './ButtonsGrouping.scss'

export const ProfileButtons = (props) =>{
    
  const {txt1, txt2} = props
  return(
      <div className="profileButtons">
        
       <Link to="/Profile">
        <SimpleButton
          text={txt1}
          className='profileBtns'
        />
       </Link> 
       <Link to="Created">
        <SimpleButton
          text={txt2}
          className='profileBtns'
        />
        </Link>
      </div>
    )
}