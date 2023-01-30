import React from "react";
import './txt.scss'

export const  NormalTxt = (props) => {
  const {txt} = props;
  return(
    <p className="normalTxt">
        {txt}
    </p>
  )
}