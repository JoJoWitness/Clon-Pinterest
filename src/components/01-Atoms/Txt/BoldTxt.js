import React from "react";
import './txt.scss'

export const BoldTxt = (props) => {
  const {txt} = props;
  return(
    <h1 className="boldTxt">
        {txt}
    </h1>
  )
}