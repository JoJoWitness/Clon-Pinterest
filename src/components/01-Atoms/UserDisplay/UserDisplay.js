import React from "react";
import './UserDisplay.scss'

export const UserDisplay = (props) =>{
  const {userImg, userName} = props
  return(
    <div className="userDisplay">
      <img src={userImg}/>
      <p>{userName}</p>
    </div>
  )
}

export const CommentDisplay = (props) =>{
  const {comment} = props
  // console.log(comment)
  // let dateFull = comment.timestamp
  // const dateArray = dateFull.split(" at ")
  // let date = dateArray[0]

  return(
    <div className="commentDisplay">
      <img src={comment.userImg}/>
      <p>{comment.userName}</p>
      <p>{comment.comment}</p>
      {/* <p>{date}</p> */}
    </div>
  )
}