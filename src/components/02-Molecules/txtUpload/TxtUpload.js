import React from "react";
import { TxtInput } from "../../01-Atoms/TxtInput/txtInput";
import './txtUpload.scss'

export const TxtUpload = (props) =>{

  const {pinTitle, setPinTitle, pinDescription, setPinDescription} = props

  return(
    <div className="txtUpload">
      <TxtInput
      id='pinTitle'
      labelTxt='Add a Title'
      className='inputTitle'
      maxLength='50'
      state={pinTitle}
      setState={setPinTitle}/>
     
      <TxtInput
       id='pinDescription'
       labelTxt='Add a Description'
       className='inputDescription'
       maxLength='400'
       state={pinDescription}
       setState={setPinDescription}/>
    </div>
  )
}