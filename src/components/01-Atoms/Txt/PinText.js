import React from "react";
import './txt.scss'

export const PinText = (props) => {
  const {txt} = props;
  return(
    <p className="pinTxt">
     {txt}
    </p>
  )
}
