import React from'react'
import './TimeLineCreateButton.css'
import { history } from "../redux/configureStore";

function TimeLineCreateButton(){

    const goPost = () => {
      history.push({
          pathname: '/main/CreateTimeLine',
        })
    } 

    return(
      <div className = "TimeLineCreateButton" onClick={goPost}>
        생성
      </div>
    )
}

export default TimeLineCreateButton;