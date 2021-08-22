import React from'react'
import './ReviseButton.css'
import { history } from "../redux/configureStore";

function ReviseButton(){

    const goRevise = () => {
      history.push({
          pathname: '/main/Revise',
        })
    } 

    return(
      <div className = "revisebutton" onClick={goRevise}>
        정보 수정
      </div>
    )
}

export default ReviseButton;