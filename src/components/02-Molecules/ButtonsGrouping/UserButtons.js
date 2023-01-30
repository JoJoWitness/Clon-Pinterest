import React from "react";
import { Link } from "react-router-dom";
import { IconButton} from "../../01-Atoms/SimpleButtons/IconButton";
import Notification from '../../../assets/icons/Notification.svg'
import Messages from '../../../assets/icons/Chat.svg'
import User from '../../../assets/icons/User.svg'
import './ButtonsGrouping.scss'
import { SimpleButton } from "../../01-Atoms/SimpleButtons/SimpleButton";

export function UserButtons(props){

const {signIn, signOut, currentUser} = props

  return(
    <div className="userBtns">
      <IconButton
      src={Notification}
      alt='Notifications'
      className='iconBtn'/>
      {
      (currentUser.email)
      ? 
      <Link to='Profile'>
        <IconButton
          src={currentUser.photoURL}
          alt='Account'
          className='iconBtn'
          fn={false}
        />
      </Link>
      :
      <IconButton
        src={User}
        alt='Account'
        className='iconBtn'
        fn={signIn}
      />
      }
      {(currentUser.email)
      ?
        <SimpleButton
        className='feedBtn'
        text='Sign out'
        fn={signOut}/>
      :(null)
      }
  
    </div>
  )
}