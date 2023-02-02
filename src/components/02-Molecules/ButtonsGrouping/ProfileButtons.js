import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SimpleButton } from "../../01-Atoms/SimpleButtons/SimpleButton";
import './ButtonsGrouping.scss'

export const ProfileButtons = (props) =>{

  const [activeBtn1, setActiveBtn1] = useState(false);
  const [activeBtn2, setActiveBtn2] = useState(false);

  function highligthBtn1() {
    setActiveBtn1(true)
    setActiveBtn2(false)
  }

  function highligthBtn2() {
    setActiveBtn2(true)
    setActiveBtn1(false)
  }
  useEffect(()=>{

    highligthBtn2()
  }, [])

   


    
  const {txt1, txt2} = props
  return(
      <div className="profileButtons">
        
       <Link to="Created" id="created" >
        <SimpleButton
          text={txt1}
          className='profileBtns created'
          fn = {highligthBtn1}
          id={activeBtn1 ? "active" : "notActive"}
          

          
        />
       </Link> 
       <Link to="/Profile" id="saved">
        <SimpleButton
          text={txt2}
          className='profileBtns saved'
          fn = {highligthBtn2}
          id={activeBtn2 ? "active" : "notActive"}
          
        />
        </Link>
      </div>
    )
}