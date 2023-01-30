import React from "react";
import { FeedButtons } from "../../02-Molecules/ButtonsGrouping/FeedButtons";
import { UserButtons } from "../../02-Molecules/ButtonsGrouping/UserButtons";
import { SearchBar } from "../../01-Atoms/SearchBar/SearchBar";
import Paw from '../../../assets/icons/Paw.svg'
import './navbar.scss'

export function NavBar(props){

  const {signIn, signOut, currentUser} = props

  return(
    <nav className="navbar">
      <span 
      className='logo'>
        <img
        className='ico'
        src={Paw}/>
      </span>
      <FeedButtons/>
      <SearchBar
      className='searchNavBar'/>
      <UserButtons
      currentUser={currentUser}
      signIn={signIn}
      signOut={signOut}
      />
    </nav>
  )
}