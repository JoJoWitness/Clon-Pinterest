import React from "react";
import './txtInput.scss'

export const TxtInput = (props) => {

  const {id, labelTxt, className, maxLength, state, setState} = props

  function handleChange(event) {
    setState(event.target.value);
  }

  return(
    <>
    <label htmlFor={id} className='inputLabel'>{labelTxt} </label>
    <textarea type="text" id={id} name={id} placeholder={labelTxt} className={className}
    maxLength={maxLength}
    value ={state}
    onChange={handleChange}/>
   
    </>
  );
}
