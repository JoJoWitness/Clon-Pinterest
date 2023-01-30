import React from "react";
import { SimpleButton } from "../../01-Atoms/SimpleButtons/SimpleButton";
import { ProfileWindow } from "../../03-Organism/ProfileWindow/ProfileWindow";
import './ButtonsGrouping.scss'

export const ProfileButtons = (props) =>{
    
  const {txt1, txt2} = props
  return(
      <div className="profileButtons">
        <SimpleButton
          text={txt1}
          className='profileBtns'
        />
        <SimpleButton
          text={txt2}
          className='profileBtns'
        />
      </div>
    )
}