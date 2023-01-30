import React from "react";
import './txt.scss'

export const PinTitle = (props) => {
  const {txt} = props;
  return(
    <h1 className="pinTitle">
        {txt}
    </h1>
  )
}