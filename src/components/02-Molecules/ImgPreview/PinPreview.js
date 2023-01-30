import React from "react";
import { PreviewTxt } from "../../01-Atoms/Txt/PreviewTxt";
import './PinPreview.scss'

export const PinPreview = (props) => {

  const {pin, dataKey} = props
  return(
    <div className='PinPreview' key={dataKey}>
      <img
        src={pin.file}
      />
      <PreviewTxt
        txt={pin.title}
        />
    </div>
  )
}

