import React from "react";
import './txt.scss'

export const PreviewTxt = (props) => {
  const {txt} = props;
  return(
    <h6 className="previewTxt">
      {txt}
    </h6>
  )
}
