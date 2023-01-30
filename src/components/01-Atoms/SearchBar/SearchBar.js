import React from "react";
import './searchBar.scss'

export const SearchBar= (props) => {
  const {className} = props;
  return(

    <input className={className} type='search' placeholder="Search"> 
      
    </input>

  )
}