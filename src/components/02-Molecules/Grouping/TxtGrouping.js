import React from "react";
import { NormalTxt } from "../../01-Atoms/Txt/NormalTxt";
import './TxtGrouping.scss'

export const TxtGrouping = (props) => {
  const {followers, followed} = props;
  return(
    <span className='txtGrouping'>
        <NormalTxt
          txt={followers}
        />
        <NormalTxt
          txt={followed}
        />
    </span>
  )
}